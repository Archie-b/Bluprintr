using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bluprintr.Models.data.Interfaces;
using Bluprintr.Models.data;
using Bluprintr.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace Bluprintr.Controllers
{
    [Route("api/[controller]/{route}")]
    public class ProjectController : Controller
    {
        protected Driver<Project> dBInterface;
        private bool useMongo;

        public ProjectController(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.useMongo = settings.UseMongo;
                this.dBInterface = new Driver<Project>(settings, "Projects");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        [Route("getForUser")]
        public IActionResult GetForUser(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.dBInterface.Get(false).ToList().Where(p => p.Owner == id)));
        }


        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Project project)
        {
            return new Response(JsonConvert.SerializeObject(this.dBInterface.Post(project)));
        }

        [HttpGet("get/{id}")]
        [Authorize]
        [Route("get")]
        public IActionResult Get(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.dBInterface.Get(id)));
        }

        [Authorize]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            return new Response(JsonConvert.SerializeObject(this.dBInterface.Get(true)));
        }
    }


}
