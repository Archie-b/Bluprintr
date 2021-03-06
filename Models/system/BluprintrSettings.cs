﻿namespace Bluprintr.Models
{
    /// <summary>Concrete for handling app settings</summary>
    /// <seealso cref="Bluprintr.Models.IBluprintrSettings" />
    public class BluprintrSettings : IBluprintrSettings
    {
        /// <summary>Gets or sets the app database settings.</summary>
        /// <value>The app database settings.</value>
        public BluprintrDatabaseSettings BluprintrDatabaseSettings { get; set; }

        /// <summary>Gets or sets the blueprint schema.</summary>
        /// <value>The blueprint schema.</value>
        public string BlueprintSchema { get; set; }

        /// <summary>Gets or sets the allowed hosts.</summary>
        /// <value>The allowed hosts.</value>
        public string AllowedHosts { get; set; }

        /// <summary>Gets or sets a value indicating whether [use mongo].</summary>
        /// <value><c>true</c> if [use mongo]; otherwise, <c>false</c>.</value>
        public bool UseMongo { get; set; }
    }
}
