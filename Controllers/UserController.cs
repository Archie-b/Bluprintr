namespace JWTAuthentication.Controllers
{
    using System.Linq;
    using Bluprintr.Classes;
    using Bluprintr.Models;
    using Bluprintr.Models.Data;
    using Bluprintr.Models.Data.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using MongoDB.Driver;
    using Newtonsoft.Json;

    /// <summary>A controller for accessing and modifying users in the database</summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class UserController : Controller
    {
        /// <summary>A configuration object used to set up keys for authentication</summary>
        private IConfiguration config;

        /// <summary>The interface for accessing the database</summary>
        private Driver<User> driver;

        /// <summary>Whether to use the mongo database</summary>
        private bool useMongo;

        /// <summary>Object for handling hashing and token generation</summary>
        private Authentication auth;

        /// <summary>Initializes a new instance of the <see cref="UserController"/> class.</summary>
        /// <param name = "config" >A configuration object used to set up keys for authentication</param>
        /// <param name = "settings">A settings object containing data for connecting to the database</param>
        public UserController(IConfiguration config, IBluprintrSettings settings)
        {
            this.config = config;
            this.auth = new Authentication(config);
            if (settings != null)
            {
                this.useMongo = settings.UseMongo;
                if (this.useMongo)
                {
                    this.driver = new Driver<User>(settings, "users");
                }
                else
                {
                    // this.driver = new MSSQLDriver(settings);
                }
            }
        }

        /// <summary>An API endpoint for authenticating login credentials and providing a token for future requests</summary>
        /// <param name="login">(From Body) the login credentials provided by the user</param>
        /// <returns>An API response object containing the login token and user ID</returns>
        [ActionName("Login")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            this.auth.HashPasword(ref login);
            var user = this.driver.Get(false).ToList()
                .Where(user => user.Username == login.Username && user.Password == login.Password).FirstOrDefault();
            if (user != null)
            {
                var tokenString = this.auth.GenerateJSONWebToken(user);
                response = new Response(JsonConvert.SerializeObject(new { token = tokenString, id = user.Id }));
            }

            return response;
        }

        /// <summary>An API endpoint for creating a login based on the user's provided credentials</summary>
        /// <param name="login">(From Body) the login credentials provided by the user</param>
        /// <returns>An API response object containing the login token and user ID</returns>
        [ActionName("Signup")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult SignUp([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            this.auth.HashPasword(ref login);

            if (this.driver.Get(false).ToList().Where(user => user.Username == login.Username).Count() > 0)
            {
                response = new Response("bad username");
            }
            else
            {
                string userID = this.driver.Post(login);
                if (userID != null)
                {
                    var tokenString = this.auth.GenerateJSONWebToken(login);
                    response = new Response(JsonConvert.SerializeObject(new { token = tokenString, id = userID }));
                }
            }

            return response;
        }

        /// <summary>An API endpoint for getting user details based on their ID</summary>
        /// <param name="id">The ID of the user to be fetched</param>
        /// <returns>An API response object containing the user's details</returns>
        [Authorize]
        [HttpGet("{id}")]
        [ActionName("get")]
        public IActionResult Get(string id)
        {
            return new Response(JsonConvert.SerializeObject(this.driver.Get(id)));
        }

        /// <summary>An API endpoint for changing a user's password</summary>
        /// <param name="login">(From Body) the new login credentials provided by the user</param>
        /// <returns>An API response object containing the user's details</returns>
        [ActionName("UpdatePassword")]
        [Authorize]
        [HttpPost]
        public IActionResult UpdatePassword([FromBody] User login)
        {
            this.auth.HashPasword(ref login);
            return new Response(JsonConvert.SerializeObject(this.driver.Update(login)));
        }
    }
}