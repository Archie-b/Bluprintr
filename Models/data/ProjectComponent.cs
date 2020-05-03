namespace Bluprintr.Models.Data
{
    using System.Collections.Generic;
    using Bluprintr.Models.Data.Interfaces;

    /// <summary>A component attached to a project</summary>
    /// <seealso cref="Bluprintr.Models.Data.Interfaces.IMongoElement" />
    public class ProjectComponent : IMongoElement
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The ID of the ProjectComponent</value>
        public string Id { get; set; }

        /// <summary>Gets or sets a value indicating whether the component needs replacing.</summary>
        /// <value>
        /// <c>true</c> if [needs replacing]; otherwise, <c>false</c>.</value>
        public bool NeedsReplacing { get; set; }

        /// <summary>Gets or sets the notes.</summary>
        /// <value>The notes attached to the component</value>
        public string Notes { get; set; }

        /// <summary>Gets or sets whether the element publically accessible</summary>
        /// <value>Whether the element is publically accessible</value>
        public bool? IsPublic { get; set; }

        /// <summary>Gets or sets the code.</summary>
        /// <value>The code that is associated with the component</value>
        public string Code { get; set; }

        /// <summary>Gets or sets the base component.</summary>
        /// <value>The base component that is associated with the component</value>
        public string BaseComponent { get; set; }
    }
}
