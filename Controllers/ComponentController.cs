using Bluprintr.Models;
using Bluprintr.Models.data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json.Schema;
using System.Collections.Generic;
using System.Linq;
using MoreLinq.Extensions;
using Newtonsoft.Json;

namespace Bluprintr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : Controller
    {
        protected Driver<Blueprint> dBInterface;
        protected JSchema uploadComponentSchema;
        protected bool useMongo;
        public ComponentController(IBluprintrSettings settings)
        {
          
            if (settings != null)
            {
                this.dBInterface = new Driver<Blueprint>(settings, "blueprints");
            }
        }
        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            return new Response(JsonConvert.SerializeObject(getSubComponents(new List<Component>(), this.dBInterface.Get(true).ToList().Select(b => b.Components).SelectMany(comp => comp).ToList()).DistinctBy(comp => comp.Name).Select(comp => comp.Components = null).ToList()));
        }



        private List<Component> getSubComponents(List<Component> result, List<Component> components)
        {
            foreach (Component comp in components)
            {
                if (comp.Components != null)
                {
                    result.Add(comp);
                    getSubComponents(result, comp.Components);
                }
                else
                {
                    result.Add(comp);
                }
            }
            return result;
        }



    }
}
