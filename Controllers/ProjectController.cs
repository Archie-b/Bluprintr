
namespace Bluprintr.Controllers
{
    using System.Collections.Generic;
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    public class ProjectController : SuperController
    {

        public ProjectController(IBluprintrSettings settings) : base(settings) { }

        // GET: api/Project
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Project/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Project
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Project/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
