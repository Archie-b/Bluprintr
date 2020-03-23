namespace Bluprintr.Models
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using Data.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    /// <summary>A Blueprint component element</summary>
    /// <seealso cref="Bluprintr.Models.Data.Interfaces.IMongoElement" />
    /// <seealso cref="System.IEquatable{Bluprintr.Models.Component}" />
    public class Component : IMongoElement, IEquatable<Component>
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The Component's ID</value>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>Gets or sets the name.</summary>
        /// <value>The name of the component</value>
        public string Name { get; set; }

        /// <summary>Gets or sets the description.</summary>
        /// <value>The description of the component</value>
        public string Description { get; set; }

        /// <summary>Gets or sets the map.</summary>
        /// <value>The map of the component</value>
        public string Map { get; set; }

        /// <summary>Gets or sets the components.</summary>
        /// <value>The subcomponents of the component</value>
        [BsonElement("Components")]
        public List<Component> Components { get; set; }

        /// <summary>Gets or sets the is publically accessible</summary>
        /// <value>Whether the component is public</value>
        public bool? IsPublic { get; set; }

        /// <summary>Gets or sets the color.</summary>
        /// <value>The color of the component </value>
        public string Colour { get; set; }

        /// <summary>Indicates whether the current object is equal to another object of the same type.</summary>
        /// <param name="other">An object to compare with this object.</param>
        /// <returns>
        ///   <span class="keyword">
        ///     <span class="languageSpecificText">
        ///       <span class="cs">true</span>
        ///       <span class="vb">True</span>
        ///       <span class="cpp">true</span>
        ///     </span>
        ///   </span>
        ///   <span class="nu">
        ///     <span class="keyword">true</span> (<span class="keyword">True</span> in Visual Basic)</span> if the current object is equal to the <paramref name="other" /> parameter; otherwise, <span class="keyword"><span class="languageSpecificText"><span class="cs">false</span><span class="vb">False</span><span class="cpp">false</span></span></span><span class="nu"><span class="keyword">false</span> (<span class="keyword">False</span> in Visual Basic)</span>.
        /// </returns>
        public bool Equals([AllowNull] Component other)
        {
            return this.Name == other.Name;
        }
    }
}
