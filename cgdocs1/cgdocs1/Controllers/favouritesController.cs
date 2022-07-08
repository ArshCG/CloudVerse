using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cgdocs1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cgdocs1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class favouritesController : ControllerBase
    {
        private readonly cloudverseContext _cloudverseContext;

        public favouritesController(cloudverseContext cloudversecontext)
        {
            _cloudverseContext = cloudversecontext;
        }

        // GET: api/folder

        //[HttpGet]
        //public IActionResult getfolderlist()
        //{
        //    var getfolder = _cloudverseContext.Folders.ToList();
        //    return Ok(getfolder);
        //}

        // GET: api/folder/5
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {

            var result = _cloudverseContext.Documents.Where(obj => obj.FolderId == id && obj.IsFavourite == true && obj.IsDeleted == false);
            return Ok(result);

        }
        [HttpGet("fol/{id}")]
        public IActionResult get(int id)
        {

            var result = _cloudverseContext.Folders.Where(obj => obj.CreatedBy == id && obj.IsFavourite == true && obj.IsDeleted==false);

            return Ok(result);

        }

      



        // DELETE: api/ApiWithActions/5
        [HttpDelete("del/{id}")]
        public void Delete(int id)
        {
            var result2 = _cloudverseContext.Documents.Where(res => res.DocId == id).ToList();
            result2.ForEach(res => _cloudverseContext.Documents.Remove(res));
            _cloudverseContext.SaveChanges();


        }

        [HttpDelete("delete/{id}")]
        public void Deletefolder(int id)
        {
            var result2 = _cloudverseContext.Documents.Where(res => res.FolderId == id).ToList();
            result2.ForEach(res => _cloudverseContext.Documents.Remove(res));
            _cloudverseContext.SaveChanges();
            var result = _cloudverseContext.Folders.Where(res => res.Id == id).ToList();
            result.ForEach(res => _cloudverseContext.Folders.Remove(res));
            _cloudverseContext.SaveChanges();

        }
    }
}
