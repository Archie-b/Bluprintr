using Bluprintr.Classes;
using Bluprintr.Models;
using Bluprintr.Models.data;
using Bluprintr.Models.data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.Linq;
using Newtonsoft.Json;

namespace JWTAuthentication.Controllers
{
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class UserController : Controller

    {
        private IConfiguration _config;
        private bool useMongo;
        private Driver<User> dBInterface;
        private Authentication auth;

        public UserController(IConfiguration config, IBluprintrSettings settings)
        {
            _config = config;
            auth = new Authentication(config);
            if (settings != null)
            {
                this.useMongo = settings.UseMongo;
                if (this.useMongo)
                {
                    this.dBInterface = new Driver<User>(settings, "users");
                }
                else
                {
                    // this.dBInterface = new MSSQLDriver(settings);
                }
            }
        }

        [ActionName("Login")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            auth.HashPasword(ref login);
            var user = dBInterface.Get(false).ToList()
                .Where(user => user.Username == login.Username && user.Password == login.Password).FirstOrDefault();
            if (user != null)
            {
                var tokenString = auth.GenerateJSONWebToken(user);
                response = new Response(JsonConvert.SerializeObject(new { token = tokenString, id = user.Id }));
            }

            return response;
        }

        [ActionName("Signup")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult SignUp([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            auth.HashPasword(ref login);

            if (dBInterface.Get(false).ToList().Where(user => user.Username == login.Username).Count() > 0)
            {
                response = new Response("bad username");
            }
            else
            {
                string userID = dBInterface.Post(login);
                if (userID != null)
                {
                    var tokenString = auth.GenerateJSONWebToken(login);
                    response = new Response(JsonConvert.SerializeObject(new { token = tokenString, id = userID }));
                }
            }
            return response;
        }

        [Authorize]
        [HttpGet("{id}")]
        [ActionName("get")]
        public IActionResult Get(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.dBInterface.Get(id)));
        }

        [ActionName("UpdatePassword")]
        [Authorize]
        [HttpPost]
        public IActionResult UpdatePassword([FromBody] User login)
        {
            return new Response(JsonConvert.SerializeObject(dBInterface.Update(login)));
        }
    }
}