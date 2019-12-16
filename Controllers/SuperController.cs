using Bluprintr.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Schema;

namespace Bluprintr.Controllers
{
    public class SuperController : Controller
    {
        protected IInterface dBInterface;
        protected JSchema uploadComponentSchema;
        protected bool useMongo;

        public SuperController(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.uploadComponentSchema = JSchema.Parse(settings.BlueprintSchema);
                this.useMongo = settings.UseMongo;
                if (this.useMongo)
                {
                    this.dBInterface = new MongoDBDriver(settings);
                }
                else
                {
                    this.dBInterface = new MSSQLDriver(settings);
                }
            }
        }


    }
}
