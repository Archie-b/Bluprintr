using System;
using System.Security.Permissions;
using Bluprintr.Models.data.Interfaces;

namespace Bluprintr.Models
{
    using System.Collections.Generic;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

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
    }


    public class BlueprintResponse
    {
        public List<Blueprint> Blueprints;
        public List<string> Tags;
    }
}
