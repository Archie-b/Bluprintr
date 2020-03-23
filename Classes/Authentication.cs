namespace Bluprintr.Classes
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Cryptography;
    using System.Text;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Models.Data;

    /// <summary>A class for handling the authentication and hashing of user info</summary>
    public class Authentication
    {
        /// <summary>Configuration containing data for token generation</summary>
        private IConfiguration config;

        /// <summary>Initializes a new instance of the <see cref="Authentication"/> class.</summary>
        /// <param name="config">Contains data for generating tokens</param>
        public Authentication(IConfiguration config)
        {
            this.config = config;
        }

        /// <summary>Generates a JSON web token.</summary>
        /// <param name="userInfo">The user the token will be generated for</param>
        /// <returns>A token that will be used to authenticate the user's session's future requests</returns>
        public string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                this.config["Jwt:Issuer"],
                this.config["Jwt:Issuer"],
                null,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>Hashes the password.</summary>
        /// <param name="login">The user whose password needs to be hashed</param>
        public void HashPasword(ref User login)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }

                login.Password = builder.ToString();
            }
        }
    }
}
