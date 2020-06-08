namespace Bluprintr.Controllers
{
    using System.Linq;
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models.Data;
    using Models.Data.Interfaces;
    using MongoDB.Driver;
    using Newtonsoft.Json;

    /// <summary>Controller for accessing and modifying projects in the database</summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/[controller]/{action}")]
    public class ProjectController : Controller
    {
        /// <summary>The interface for accessing the database</summary>
        private Driver<Project> driver;

        /// <summary>Whether to use the mongo database</summary>
        private bool useMongo;

        /// <summary>Initializes a new instance of the <see cref="ProjectController"/> class.</summary>
        /// <param name="settings">The settings used to connect to the database</param>
        public ProjectController(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.useMongo = settings.UseMongo;
                this.driver = new Driver<Project>(settings, "Projects");
            }
        }

        /// <summary>Gets all the projects owned by the specified user ID</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A JSON representation of the user's projects</returns>
        [HttpGet("{id}")]
        [Authorize]
        [ActionName("getForUser")]
        public IActionResult GetForUser(string id)
        {
            var temp = this.driver.Get(false).ToList();
            var temp2 = temp.Where(p => p.Owner == id).ToList();
            return new Response(JsonConvert.SerializeObject(temp2));
        }

        /// <summary>Adds the provided project to the database</summary>
        /// <param name="project">The project</param>
        /// <returns>The ID of the added project</returns>
        [HttpPost]
        [Authorize]
        [ActionName("post")]
        public IActionResult Post([FromBody] Project project)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Post(project)));
        }

        /// <summary>Updates the provided project in the database</summary>
        /// <param name="project">The project</param>
        /// <returns>The ID of the updated project</returns>
        [HttpPost]
        [Authorize]
        [ActionName("update")]
        public IActionResult Update([FromBody] Project project)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Update(project)));
        }

        /// <summary>Gets the project with the provided ID</summary>
        /// <param name="id">The project's ID</param>
        /// <returns>A JSON representation of the project</returns>
        [HttpGet("{id}")]
        [Authorize]
        [ActionName("get")]
        public IActionResult Get(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Get(id)));
        }

        /// <summary>Gets all projects in the database</summary>
        /// <returns>A JSON representation of all the projects in the database</returns>
        [HttpGet]
        [Authorize]
        [ActionName("getAll")]
        public IActionResult GetAll()
        {
            var temp = this.driver.Get(false).ToList();
            return new Response(JsonConvert.SerializeObject(temp));
        }

        /// <summary>Gets the project with the component with the provided code </summary>
        /// <param name="data">The data for the search</param>
        /// <returns>A JSON representation of the project</returns>
        [HttpPost]
        [Authorize]
        [ActionName("getProjectByComponentCode")]
        public IActionResult GetProjectByComponentCode([FromBody] (string userID, string componentCode) data)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Get(false).ToList()
                .Where(item => item.Owner == data.userID 
                        && item.Components.FindAll(component => component.Code == data.componentCode).Count > 0)));
        }

        /// <summary>Deletes the project with the specified ID</summary>
        /// <param name="id">The ID of the project to be deleted</param>
        /// <returns>Boolean representing the success of the delete</returns>
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            return this.Json(this.driver.Delete(id));
        }
    }
}
