namespace Bluprintr.Models
{
    /// <summary>Interface for handling app settings</summary>
    public interface IBluprintrSettings
    {
        /// <summary>Gets or sets the app database settings.</summary>
        /// <value>The app database settings.</value>
        BluprintrDatabaseSettings BluprintrDatabaseSettings { get; set; }

        /// <summary>Gets or sets the blueprint schema.</summary>
        /// <value>The blueprint schema.</value>
        string BlueprintSchema { get; set; }

        /// <summary>Gets or sets the allowed hosts.</summary>
        /// <value>The allowed hosts.</value>
        string AllowedHosts { get; set; }

        /// <summary>Gets or sets a value indicating whether [use mongo].</summary>
        /// <value><c>true</c> if [use mongo]; otherwise, <c>false</c>.</value>
        bool UseMongo { get; set; }
    }
}
