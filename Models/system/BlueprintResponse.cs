namespace Bluprintr.Models
{
    using System.Collections.Generic;

    /// <summary>A response with a list of blueprints and their tags</summary>
    public class BlueprintResponse
    {
        /// <summary>Gets or sets the blueprints.</summary>
        /// <value>The blueprints.</value>
        public List<Blueprint> Blueprints { get; set; }

        /// <summary>Gets or sets the tags.</summary>
        /// <value>The tags of all the blueprints in the list</value>
        public List<string> Tags { get; set; }
    }
}
