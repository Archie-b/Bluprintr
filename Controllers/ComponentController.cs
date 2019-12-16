using Bluprintr.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bluprintr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : SuperController
    {
        public ComponentController(IBluprintrSettings settings) : base(settings)
        {
        }

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


    }
}
