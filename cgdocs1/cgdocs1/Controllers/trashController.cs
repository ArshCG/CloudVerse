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
    public class trashController : ControllerBase
    {
        private readonly cloudverseContext _cloudverseContext;

        public trashController(cloudverseContext cloudversecontext)
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

            var result = _cloudverseContext.Documents.Where(obj => obj.FolderId == id && obj.IsDeleted == true);
            return Ok(result);

        }
        [HttpGet("fol/{id}")]
        public IActionResult get(int id)
        {

            var result = _cloudverseContext.Folders.Where(obj => obj.CreatedBy == id && obj.IsDeleted == true);
            
            return Ok(result);

        }

        //[HttpGet("folder/{id}/{value}")]
        //public IActionResult Get(int id, string value)
        //{


        //    var result = _cloudverseContext.Folders.Where(obj => (obj.FName.Contains(value) && obj.CreatedBy == id));
        //    return Ok(result);



        //}


        // POST: api/folder
        //[HttpPost]
        //public void Post([FromBody] folder value)
        //{
        //    Folders obj = new Folders();

        //    obj.FName = value.FName;
        //    obj.CreatedBy = value.CreatedBy;
        //    obj.CreatedAt = value.CreatedAt;
        //    obj.IsDeleted = value.IsDeleted;
        //    obj.IsFavourite = value.IsFavourite;
        //    _cloudverseContext.Folders.Add(obj);
        //    _cloudverseContext.SaveChanges();
        //}

        // PUT: api/folder/5
        //[HttpPut("del/{id}")]
        //public void Put(int id,[FromBody] folder value)
        //{
        //    var res1 = _cloudverseContext.Documents.Where(res => res.FolderId == id).ToList();
        //    res1.ForEach(
        //        res => res.IsDeleted = true;
        //        res => _cloudverseContext.Documents.Update(res);
        //    );
        //    _cloudverseContext.SaveChanges();

        //    var res2 = _cloudverseContext.Folders.First(res => res.Id == id);
        //    res2.IsDeleted = true;
        //    _cloudverseContext.Folders.Update(res2);
        //    _cloudverseContext.SaveChanges();




        //}



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
