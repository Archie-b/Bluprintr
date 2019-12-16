namespace Bluprintr.Models
{
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Data;
    using System.Data.SqlClient;

    public class MSSQLDriver : IInterface
    {
        private readonly string connectionString;

        public MSSQLDriver(IBluprintrSettings settings)
        {
            if (settings != null)
            {
                this.connectionString = settings.BluprintrDatabaseSettings.MSSQLConnectionString;
            }
        }

        public bool Add(JObject value)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public ActionResult Retrieve()
        {
            string content;
            using (var conn = new SqlConnection(this.connectionString))
            using (var command = new SqlCommand("GetBlueprints", conn)
            {
                CommandType = CommandType.StoredProcedure,
            })
            {
                conn.Open();
                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows && reader.Read())
                {
                    content = reader[0].ToString();
                }

                content = string.Empty;
            }

            return new Response(content);
        }

        public ActionResult Retrieve(string id)
        {
            throw new NotImplementedException();
        }
    }
}
