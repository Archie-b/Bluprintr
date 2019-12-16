namespace Bluprintr.Models
{
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class Response : ContentResult
    {
        public Response(string content)
        {
            this.Content = content;
            this.StatusCode = 200;
            this.ContentType = "application/json";
        }
    }
}
