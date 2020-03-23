namespace Bluprintr.Models
{
    /// <summary>Interface for handling database settings</summary>
    public interface IBluprintrDatabaseSettings
    {
        /// <summary>Gets or sets the name of the blueprints collection.</summary>
        /// <value>The name of the blueprints collection.</value>
        string BlueprintsCollectionName { get; set; }

        /// <summary>Gets or sets the mongo database connection string.</summary>
        /// <value>The mongo database connection string.</value>
        string MongoDBConnectionString { get; set; }

        /// <summary>Gets or sets the MSSQL connection string.</summary>
        /// <value>The MSSQL connection string.</value>
        string MSSQLConnectionString { get; set; }

        /// <summary>Gets or sets the name of the database.</summary>
        /// <value>The name of the database.</value>
        string DatabaseName { get; set; }
    }
}
