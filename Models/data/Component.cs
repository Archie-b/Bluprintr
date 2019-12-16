namespace Bluprintr.Models
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class Component : IBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Map { get; set; }

        [BsonElement("Components")]
        public List<Component> Components { get; set; }
    }
}
