using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bluprintr.Models.data.Interfaces;

namespace Bluprintr.Models.data
{
    public class User : IMongoElement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool? IsPublic { get; set; }
    }

}