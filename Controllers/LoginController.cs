using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Bluprintr.Controllers;
using Bluprintr.Models.data;
using Bluprintr.Models;
using Bluprintr.Models.data.Interfaces;
using MongoDB.Driver;
using Newtonsoft.Json.Schema;
using System.Security.Cryptography;

namespace JWTAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller

    {
        private IConfiguration _config;
        private bool useMongo;
        private Driver<User> dBInterface;

        public LoginController(IConfiguration config, IBluprintrSettings settings)
        {
            _config = config;

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
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User AuthenticateUser(User login)
        {
            string hashedPassword = "";
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                hashedPassword = builder.ToString();
            }
            if (dBInterface.Get(false).ToList().Where(user => user.Username == login.Username && user.Password == hashedPassword).Count() > 0)
            {
                return login;
            }
            return null;
        }
    }
}