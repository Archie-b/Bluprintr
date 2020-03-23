namespace Bluprintr.Models.Data.Interfaces
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    /// <summary>An element that can be represented in the mongo database</summary>
    public interface IMongoElement
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The ID of the element</value>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>Gets or sets whether the element publically accessible</summary>
        /// <value>Whether the element is publically accessible</value>
        public bool? IsPublic { get; set; }
    }
}