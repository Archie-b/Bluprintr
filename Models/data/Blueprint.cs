using System.Buffers;

namespace Bluprintr.Models
{
    using Bluprintr.Models.data.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    using System.Collections.Generic;

    public class Blueprint : IMongoElement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        [BsonElement("Components")]
        public List<Component> Components { get; set; }

        public List<string> Tags { get; set; }

        public string DateAdded { get; set; }

        public bool? IsPublic { get; set; }
        public bool Highlighted { get; set; }
        public string Owner { get; set; }
    }


    public class BlueprintResponse
    {
        public List<Blueprint> Blueprints;
        public List<string> Tags;
    }
}
