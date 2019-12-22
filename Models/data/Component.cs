namespace Bluprintr.Models
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Runtime.Serialization;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class Component : IBase, IEquatable<Component>
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Map { get; set; }

        [BsonElement("Components")]
        public List<Component> Components { get; set; }

        public bool Equals([AllowNull] Component other)
        {
            return this.Name == other.Name;
        }
    }
}
