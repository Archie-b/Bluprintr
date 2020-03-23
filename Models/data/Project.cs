﻿namespace Bluprintr.Models.Data
{
    using System;
    using System.Collections.Generic;
    using Bluprintr.Models.Data.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    /// <summary>A user-created project</summary>
    /// <seealso cref="Bluprintr.Models.Data.Interfaces.IMongoElement" />
    public class Project : IMongoElement
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The ID of the project</value>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>Gets or sets the notes.</summary>
        /// <value>The notes attached to the project</value>
        public List<string> Notes { get; set; }

        /// <summary>Gets or sets the components.</summary>
        /// <value>The components that the project contains</value>
        public List<ProjectComponent> Components { get; set; }

        /// <summary>Gets or sets the owner.</summary>
        /// <value>The owner of the project</value>
        public string Owner { get; set; }

        /// <summary>Gets or sets whether the project publically accessible</summary>
        /// <value>Whether the project is publically accessible</value>
        public bool? IsPublic { get; set; }
    }
}
