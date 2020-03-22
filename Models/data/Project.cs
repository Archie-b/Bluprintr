using Bluprintr.Models.data.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bluprintr.Models.data
{
    public class Project : IMongoElement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public List<String> Notes { get; set; }

        public List<ProjectComponent> Components { get; set; }

        public string Owner { get; set; }

        public bool? IsPublic { get; set; }
    }

    public class ProjectComponent : IMongoElement
    {
        public string Id { get; set; }
        public bool NeedsReplacing { get; set; }
        public List<string> Notes { get; set; }
        public bool? IsPublic { get; set; }
        public string Code { get; set; }    
    }
}
