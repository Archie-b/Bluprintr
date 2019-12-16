namespace Bluprintr.Models
{
    using System.Collections.Generic;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public interface IBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        string Name { get; set; }

        string Description { get; set; }
    }
}
