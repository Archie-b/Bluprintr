using Bluprintr.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Bluprintr.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;

        public ImageController(IWebHostEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        [HttpPost] 
        [Authorize]
        public IActionResult Post([FromForm(Name = "image")] IFormFile image)
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "assets";
                string webRootPath = _hostingEnvironment.WebRootPath;
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
                    return Json(fileName);
                }
                return new Response("Upload Failed");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }
    }
}