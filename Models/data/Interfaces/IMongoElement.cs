using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Bluprintr.Models.data.Interfaces
{
    public interface IMongoElement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public bool? IsPublic { get; set; }
    }
}