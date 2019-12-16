namespace Bluprintr.Models
{
    using Microsoft.AspNetCore.Mvc;
    using MongoDB.Driver;
    using Newtonsoft.Json;
    using System.Linq;

    public class MongoDBDriver : IInterface
    {
        private readonly IMongoCollection<Blueprint> blueprints;

        public MongoDBDriver(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.blueprints = new MongoClient(settings.BluprintrDatabaseSettings.MongoDBConnectionString).GetDatabase(settings.BluprintrDatabaseSettings.DatabaseName).GetCollection<Blueprint>(settings.BluprintrDatabaseSettings.BlueprintsCollectionName);
            }
        }

        public bool Add(Newtonsoft.Json.Linq.JObject value)
        {
            if (value != null)
            {
                this.blueprints.InsertOne(JsonConvert.DeserializeObject<Blueprint>(value.ToString()));
            }

            return true;
        }

        public void Delete(string id)
        {
            this.blueprints.DeleteOne(blueprint => blueprint.Id == id);
        }

        public ActionResult Retrieve()
        {
            return new Response(JsonConvert.SerializeObject(this.blueprints.Find(blueprint => true).Project<Blueprint>(Builders<Blueprint>.Projection.Include(p => p.Id).Include(p => p.Name).Include(p => p.Description).Include(p => p.Image).Include(p => p.Tags)).ToList()));
        }

        public ActionResult Retrieve(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.blueprints.Find(blueprint => blueprint.Id == id).FirstOrDefault()));
        }
    }
}
