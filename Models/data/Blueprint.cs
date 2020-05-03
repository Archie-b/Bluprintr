namespace Bluprintr.Models
{
    using System.Collections.Generic;
    using Data.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    /// <summary>A Blueprint as created by a user</summary>
    /// <seealso cref="Bluprintr.Models.Data.Interfaces.IMongoElement" />
    public class Blueprint : IMongoElement
    {
        /// <summary>Gets or sets the ID.</summary>
        /// <value>BSON ID used for database operations</value>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>Gets or sets the name.</summary>
        /// <value>The name of the Blueprint</value>
        public string Name { get; set; }

        /// <summary>Gets or sets the description.</summary>
        /// <value>The description of the blueprint</value>
        public string Description { get; set; }

        /// <summary>Gets or sets the image.</summary>
        /// <value>The image used as a background for the blueprint</value>
        public string Image { get; set; }

        /// <summary>Gets or sets the components.</summary>
        /// <value>The components that comprise the blueprint</value>
        [BsonElement("Components")]
        public List<Component> Components { get; set; }

        /// <summary>Gets or sets the tags.</summary>
        /// <value>The tags that describe the blueprint</value>
        public List<string> Tags { get; set; }

        /// <summary>Gets or sets the date created.</summary>
        /// <value>The date the blueprint was added to the system</value>
        public string DateCreated { get; set; }

        /// <summary>Gets or sets the publicity of the blueprint</summary>
        /// <value>Whether the blueprint is accessible to any user</value>
        public bool? IsPublic { get; set; }

        /// <summary>Gets or sets a value indicating whether this <see cref="Blueprint"/> is highlighted.</summary>
        /// <value><c>true</c> if highlighted; otherwise, <c>false</c>.</value>
        public bool Highlighted { get; set; }

        /// <summary>Gets or sets the owner.</summary>
        /// <value>The ID of the owner of the blueprint</value>
        public string Owner { get; set; }
    }
}
