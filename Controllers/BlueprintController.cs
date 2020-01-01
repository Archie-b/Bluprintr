using System;
using System.Security.Cryptography.X509Certificates;
using MongoDB.Driver;

namespace Bluprintr.Controllers
{
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json.Schema;
    using System.Linq;
    using Bluprintr.Models.data.Interfaces;
    using Newtonsoft.Json;

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
            response.Tags = blueprints.Project(x => x.Tags).ToEnumerable().SelectMany(tag => tag).Distinct().ToList();
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
               // return this.dBInterface.Get(id);
            }

            return new Response(string.Empty);
        }

        // POST api/<controller>
        [Authorize]
        [HttpPost]
        public string Post([FromBody] JObject value)
        {
            if (value.IsValid(this.uploadComponentSchema))
            {
                if (this.useMongo)
                {
                  //  this.dBInterface.Post(value);
                }

                return new Response(string.Empty).ToString();
            }
            else
            {
                return new Response("Bad Schema").ToString();
            }
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
