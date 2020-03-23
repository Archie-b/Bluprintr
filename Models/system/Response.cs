namespace Bluprintr.Models
{
    using Microsoft.AspNetCore.Mvc;

    /// <summary>A HTTP response</summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ContentResult" />
    public class Response : ContentResult
    {
        /// <summary>Initializes a new instance of the <see cref="Response"/> class.</summary>
        /// <param name="content">The content of the response</param>
        public Response(string content)
        {
            this.Content = content;
            this.StatusCode = 200;
            this.ContentType = "application/json";
        }
    }
}