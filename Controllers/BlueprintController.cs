namespace Bluprintr.Controllers
{
    using Bluprintr.Models;
    using Bluprintr.Models.data.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MongoDB.Bson;
    using MongoDB.Driver;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json.Schema;
    using System;
    using System.Linq;

    [Route("api/[controller]")]
    public class BlueprintController : Controller
    {
        protected Driver<Blueprint> dBInterface;
        protected JSchema uploadComponentSchema;
        protected bool useMongo;
        public BlueprintController(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.uploadComponentSchema = JSchema.Parse(settings.BlueprintSchema);
                this.useMongo = settings.UseMongo;  
                this.dBInterface = new Driver<Blueprint>(settings, "Blueprints");
            }
        }

        // GET: api/<controller>
        [Authorize]
        [HttpGet]
        public ActionResult Get()
        {
            int? limit = Int32.TryParse(Request.Headers["limit"], out var tempVal) ? tempVal : (int?)null;

            BlueprintResponse response = new BlueprintResponse();
            IFindFluent<Blueprint,Blueprint> blueprints = this.dBInterface.Get(true).Limit(limit);
            response.Tags = blueprints.Project(x => x.Tags).ToEnumerable().Where(tags => tags != null).SelectMany(tag => tag).Distinct().ToList();
            response.Blueprints = blueprints.ToList();
            response.Blueprints.ForEach(blueprint => blueprint.Components = null);

            return new Response(JsonConvert.SerializeObject(response));
        }

        // GET api/<controller>/5
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            if (this.useMongo)
            {
               return new Response(JsonConvert.SerializeObject(this.dBInterface.Get(id)));
            }

            return new Response(string.Empty);
        }

        // POST api/<controller>
        [Authorize]
        [HttpPost]
        public void Post([FromBody] Blueprint value)
        {
            value.Components.ForEach(Component => Component.Id = ObjectId.GenerateNewId().ToString());
            this.dBInterface.Post(value);
        }

        // DELETE api/<controller>/5
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(string id)
        { 
            if (this.useMongo)
            {
              //  this.dBInterface.Delete(id);
            }
        }
    }
}
