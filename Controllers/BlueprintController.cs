namespace Bluprintr.Controllers
{
    using System.Linq;
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models.Data.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Driver;
    using Newtonsoft.Json;

    /// <summary>A Controller for accessing and modifying Blueprints in the database</summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/[controller]")]
    public class BlueprintController : Controller
    {
        /// <summary>The interface for accessing the database</summary>
        private Driver<Blueprint> driver;

        /// <summary>Whether to use the mongo database</summary>
        private bool useMongo;

        /// <summary>Initializes a new instance of the <see cref="BlueprintController"/> class.</summary>
        /// <param name="settings">Settings for connecting to the database</param>
        public BlueprintController(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.useMongo = settings.UseMongo;
                this.driver = new Driver<Blueprint>(settings, "Blueprints");
            }
        }

        /// <summary>Gets all public Blueprints from the database</summary>
        /// <returns>A JSON representation of the list of blueprints</returns>
        [Authorize]
        [HttpGet]
        public ActionResult Get()
        {
            int? limit = int.TryParse(Request.Headers["limit"], out var tempVal) ? tempVal : (int?)null;

            BlueprintResponse response = new BlueprintResponse();
            IFindFluent<Blueprint, Blueprint> blueprints = this.driver.Get(true).Limit(limit);
            response.Tags = blueprints.Project(x => x.Tags).ToEnumerable().Where(tags => tags != null).SelectMany(tag => tag).Distinct().ToList();
            response.Blueprints = blueprints.ToList();
            response.Blueprints.ForEach(blueprint => blueprint.Components = null);

            return new Response(JsonConvert.SerializeObject(response));
        }

        /// <summary>Gets a blueprint based on the provided ID</summary>
        /// <param name="id">The ID of the blueprint to be returned</param>
        /// <returns>A JSON representation of the matching blueprint</returns>
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            if (this.useMongo)
            {
                return new Response(JsonConvert.SerializeObject(this.driver.Get(id)));
            }

            return new Response(string.Empty);
        }

        /// <summary>Adds the provided blueprint to the database</summary>
        /// <param name="value">The blueprint to be added to the database</param>
        /// <returns>The ID of the added blueprint</returns>
        [Authorize]
        [HttpPost]
        public ActionResult Post([FromBody] Blueprint value)
        {
            value.Components.ForEach(delegate(Component c)
            {
                c.Id = ObjectId.GenerateNewId().ToString();
            });
            return new Response(JsonConvert.SerializeObject(this.driver.Post(value)));
        }

        /// <summary>Deletes the blueprint with the specified ID</summary>
        /// <param name="id">The ID of the blueprint to be deleted</param>
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            if (this.useMongo)
            {
                // this.driver.Delete(id);
            }
        }
    }
}
