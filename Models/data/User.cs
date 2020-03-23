namespace Bluprintr.Models.Data
{
    using Bluprintr.Models.Data.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    /// <summary>A user of the app</summary>
    /// <seealso cref="Bluprintr.Models.Data.Interfaces.IMongoElement" />
    public class User : IMongoElement
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The ID of the element</value>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>Gets or sets the username.</summary>
        /// <value>The username of the user</value>
        public string Username { get; set; }

        /// <summary>Gets or sets the password.</summary>
        /// <value>The password of the user</value>
        public string Password { get; set; }

        /// <summary>Gets or sets whether the element publically accessible</summary>
        /// <value>Whether the element is publically accessible</value>
        public bool? IsPublic { get; set; }
    }
}