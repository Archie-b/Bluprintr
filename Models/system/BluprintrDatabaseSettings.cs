namespace Bluprintr.Models
{
    public interface IBluprintrDatabaseSettings
    {
        string BlueprintsCollectionName { get; set; }

        string MongoDBConnectionString { get; set; }

        string MSSQLConnectionString { get; set; }

        string DatabaseName { get; set; }
    }

    public class BluprintrDatabaseSettings : IBluprintrDatabaseSettings
    {
        public string BlueprintsCollectionName { get; set; }

        public string MongoDBConnectionString { get; set; }

        public string MSSQLConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}
