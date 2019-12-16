using Microsoft.AspNetCore.Mvc;

namespace Bluprintr.Models
{
    public interface IInterface
    {
        ActionResult Retrieve();

        ActionResult Retrieve(string id);

        bool Add(Newtonsoft.Json.Linq.JObject value);

        void Delete(string id);
    }
}
