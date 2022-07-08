using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cgdocs1.Models;
using cgdocs1.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cgdocs1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class registerController : ControllerBase
    {
        private readonly cloudverseContext _cloudversecontext;

        public registerController(cloudverseContext cloudversecontext)
        {
            _cloudversecontext = cloudversecontext;
        }
        // GET: api/register
        [HttpGet]
        public IActionResult getuserslist()
        {
            var getuser = _cloudversecontext.Users.ToList();
            return Ok(getuser);
        }
        // GET: api/register/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/register
        [HttpPost]
        public void Post([FromBody] signup value)
        {
            Users obj = new Users();

            obj.Username = value.Username;
            obj.Password = value.Password;
            obj.CreatedAt = value.CreatedAt;
            
            _cloudversecontext.Users.Add(obj);
            _cloudversecontext.SaveChanges();
        }

        // PUT: api/register/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
