using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cgdocs1.Models;
using cgdocs1.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace cgdocs1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class loginController : ControllerBase
    {

        public static int userid;

        private readonly cloudverseContext _cloudversecontext;
        private readonly IConfiguration _config;

        public loginController(cloudverseContext cloudversecontext, IConfiguration config)
        {
            _cloudversecontext = cloudversecontext;
            _config = config;
        }


        
        

       
        [AllowAnonymous,Authorize]
        [HttpPost]
        public IActionResult CreateToken([FromBody] login login1)
        {
            Users obj = new Users();
            IActionResult response = Unauthorized();
            var user = Authenticate(login1);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString , id=userid});
                
            }
            return response;



        }

     
        private string BuildToken(signup user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private signup Authenticate(login login1)
        {
            signup user = null;
            var res = _cloudversecontext.Users.FirstOrDefault(obj => obj.Username == login1.Username);
            try
            {
                if (res.Username != null && res.Password == login1.Password)
                {
                    user = new signup { Username = res.Username, Password = res.Password };
                    userid = res.Id;
                }
                return user;
            }
            catch(Exception e)
            {
                return null;
            }
        }
       

        
    }









    // GET: api/login
   /* [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/login/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/login
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/login/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }*/
}
