﻿namespace Bluprintr.Models
{
    /// <summary>Concrete for handling database settings</summary>
    /// <seealso cref="Bluprintr.Models.IBluprintrDatabaseSettings" />
    public class BluprintrDatabaseSettings : IBluprintrDatabaseSettings
    {
        /// <summary>Gets or sets the name of the blueprints collection.</summary>
        /// <value>The name of the blueprints collection.</value>
        public string BlueprintsCollectionName { get; set; }

        /// <summary>Gets or sets the mongo database connection string.</summary>
        /// <value>The mongo database connection string.</value>
        public string MongoDBConnectionString { get; set; }

        /// <summary>Gets or sets the MSSQL connection string.</summary>
        /// <value>The MSSQL connection string.</value>
        public string MSSQLConnectionString { get; set; }

        /// <summary>Gets or sets the name of the database.</summary>
        /// <value>The name of the database.</value>
        public string DatabaseName { get; set; }
    }
}
