namespace Bluprintr.Controllers
{
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json.Schema;

    [Route("api/[controller]")]
    public class BlueprintController : SuperController
    {
        public BlueprintController(IBluprintrSettings settings) : base(settings) { }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            if (this.useMongo)
            {
                return this.dBInterface.Retrieve();
            }
            else
            {
                return this.dBInterface.Retrieve();
            }
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            if (this.useMongo)
            {
                return this.dBInterface.Retrieve(id);
            }

            return new Response(string.Empty);
        }

        // POST api/<controller>
        [HttpPost]
        public string Post([FromBody] JObject value)
        {
            if (value.IsValid(this.uploadComponentSchema))
            {
                if (this.useMongo)
                {
                    this.dBInterface.Add(value);
                }

                return new Response(string.Empty).ToString();
            }
            else
            {
                return new Response("Bad Schema").ToString();
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            if (this.useMongo)
            {
                this.dBInterface.Delete(id);
            }
        }
    }
}
