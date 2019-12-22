namespace Bluprintr.Models
{
    using Microsoft.AspNetCore.Mvc;
    using MongoDB.Bson;
    using MongoDB.Driver;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System.Linq;
    public class BlueprintMongoDBDriver : IInterface
    {
        private readonly IMongoCollection<Blueprint> blueprints;

        public BlueprintMongoDBDriver(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.blueprints = new MongoClient(settings.BluprintrDatabaseSettings.MongoDBConnectionString).GetDatabase(settings.BluprintrDatabaseSettings.DatabaseName).GetCollection<Blueprint>(settings.BluprintrDatabaseSettings.BlueprintsCollectionName);
            }
        }

        public bool Add(JObject value)
        {
            if (value != null)
            {
                this.blueprints.InsertOne(JsonConvert.DeserializeObject<Blueprint>(value.ToString()));
            }

            return true;
        }

        public void Delete(string id)
        {
            this.blueprints.DeleteOne(new BsonDocument("_id", id));
        }

        public ActionResult Retrieve()
        {
            BlueprintResponse  response =new BlueprintResponse();

            response.Tags =this.blueprints.Find(new BsonDocument())
                .Project(x => x.Tags)
                .ToEnumerable()
                .SelectMany(tag => tag)
                .Distinct()
                .ToList();
            response.Blueprints = this.blueprints.Find(blueprint => true).ToList();
            response.Blueprints.ForEach(blueprint => blueprint.Components = null);

            return new Response(JsonConvert.SerializeObject(response));
        }

        public ActionResult Retrieve(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.blueprints.Find(blueprint => blueprint.Id == id).FirstOrDefault()));
        }
    }
}
