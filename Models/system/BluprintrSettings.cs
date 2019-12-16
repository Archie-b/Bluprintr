namespace Bluprintr.Models
{
    public interface IBluprintrSettings
    {
        BluprintrDatabaseSettings BluprintrDatabaseSettings { get; set; }

        string BlueprintSchema { get; set; }

        string AllowedHosts { get; set; }

        bool UseMongo { get; set; }
    }

    public class BluprintrSettings : IBluprintrSettings
    {
        public BluprintrDatabaseSettings BluprintrDatabaseSettings { get; set; }

        public string BlueprintSchema { get; set; }

        public string AllowedHosts { get; set; }

        public bool UseMongo { get; set; }
    }
}
