namespace Bluprintr.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Mvc;
    using Models.Data.Interfaces;
    using MongoDB.Driver;
    using MoreLinq.Extensions;
    using Newtonsoft.Json;

    /// <summary>A controller for accessing and modifying components in the database</summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : Controller
    {
        /// <summary>The interface for accessing the database</summary>
        private Driver<Blueprint> driver;

        /// <summary>Initializes a new instance of the <see cref="ComponentController"/> class.</summary>
        /// <param name="settings">Settings for connecting to the database</param>
        public ComponentController(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.driver = new Driver<Blueprint>(settings, "blueprints");
            }
        }

        /// <summary>Gets all components from the database</summary>
        /// <returns>A JSON representation of the database components</returns>
        [HttpGet]
        public ActionResult Get()
        {
            return new Response(JsonConvert.SerializeObject(this.GetSubComponents(new List<Component>(), this.driver.Get(true).ToList().Select(b => b.Components).SelectMany(comp => comp).ToList()).DistinctBy(comp => comp.Name).Select(comp => comp.Components = null).ToList()));
        }

        /// <summary>Gets the sub components for a specified component recursively</summary>
        /// <param name="result">The list of subcomponents</param>
        /// <param name="components">The components currently being worked on</param>
        /// <returns>A flat list of all subcomponents of the given components</returns>
        private List<Component> GetSubComponents(List<Component> result, List<Component> components)
        {
            foreach (Component comp in components)
            {
                if (comp.Components != null)
                {
                    result.Add(comp);
                    this.GetSubComponents(result, comp.Components);
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
