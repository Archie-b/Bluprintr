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
    [Route("api/[controller]/{route}")]
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
        [Route("getForUser")]
        public IActionResult GetForUser(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Get(false).ToList().Where(p => p.Owner == id)));
        }

        /// <summary>Adds the provided project to the database</summary>
        /// <param name="project">The project</param>
        /// <returns>The ID of the added project</returns>
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Project project)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Post(project)));
        }

        /// <summary>Gets the project with the provided ID</summary>
        /// <param name="id">The project's ID</param>
        /// <returns>A JSON representation of the project</returns>
        [HttpGet("get/{id}")]
        [Authorize]
        [Route("get")]
        public IActionResult Get(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Get(id)));
        }

        /// <summary>Gets all projects in the database</summary>
        /// <returns>A JSON representation of all the projects in the database</returns>
        [Authorize]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Get(true)));
        }
    }
}
