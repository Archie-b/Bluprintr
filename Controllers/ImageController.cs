namespace Bluprintr.Controllers
{
    using System.IO;
    using System.Net.Http.Headers;
    using Bluprintr.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    /// <summary>Controller for adding images to the system</summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        /// <summary>The hosting environment, used for access to the file-system</summary>
        private IWebHostEnvironment hostingEnvironment;

        /// <summary>Initializes a new instance of the <see cref="ImageController"/> class.</summary>
        /// <param name="environment">The environment</param>
        public ImageController(IWebHostEnvironment environment)
        {
            this.hostingEnvironment = environment;
        }

        /// <summary>PoAdds a new image to the file-system</summary>
        /// <param name="image">The image to be added</param>
        /// <returns>The filename of the added image</returns>
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromForm(Name = "image")] IFormFile image)
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "assets";
                string webRootPath = this.hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return this.Json(fileName);
                }

                return new Response("Upload Failed");
            }
            catch (System.Exception ex)
            {
                return this.Json("Upload Failed: " + ex.Message);
            }
        }
    }
}