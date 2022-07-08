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
    public class folderController : ControllerBase
    {
        private readonly cloudverseContext _cloudverseContext;

        public folderController(cloudverseContext cloudversecontext)
        {
            _cloudverseContext = cloudversecontext;
        }

        // GET: api/folder
        
        [HttpGet]
        public IActionResult getfolderlist()
        {
            var getfolder = _cloudverseContext.Folders.ToList();
            return Ok(getfolder);
        }

        // GET: api/folder/5
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {

            var result = _cloudverseContext.Folders.Where(obj => obj.CreatedBy == id && obj.IsDeleted==false);
            return Ok(result);

        }

        [HttpGet("folder/{id}/{value}")]
        public IActionResult Get(int id,string value)
        {
            
            
                var result = _cloudverseContext.Folders.Where(obj => (obj.FName.Contains(value) && obj.CreatedBy == id && obj.IsDeleted == false));
                return Ok(result);

            

        }
       

        // POST: api/folder
        [HttpPost]
        public void Post([FromBody] folder value)
        {
            Folders obj = new Folders();

            obj.FName = value.FName;
            obj.CreatedBy = value.CreatedBy;
            obj.CreatedAt = value.CreatedAt;
            obj.IsDeleted = value.IsDeleted;
            obj.IsFavourite=value.IsFavourite;
            _cloudverseContext.Folders.Add(obj);
            _cloudverseContext.SaveChanges();
        }

        // PUT: api/folder/5
        [HttpPut("del/{id}")]
        public void Put(int id)
        {
            var res1 = _cloudverseContext.Documents.Where(res => res.FolderId == id).ToList();
            res1.ForEach( res => res.IsDeleted = true);
            res1.ForEach(res=>_cloudverseContext.Documents.Update(res));
            _cloudverseContext.SaveChanges();

            var res2 = _cloudverseContext.Folders.First(res => res.Id == id);
            res2.IsDeleted = true;
            _cloudverseContext.Folders.Update(res2);
            _cloudverseContext.SaveChanges();
        }
        [HttpPut("restore/{id}")]
        public void restore(int id)
        {
            var res1 = _cloudverseContext.Documents.Where(res => res.FolderId == id).ToList();
            res1.ForEach(res => res.IsDeleted = false);
            res1.ForEach(res => _cloudverseContext.Documents.Update(res));
            _cloudverseContext.SaveChanges();

            var res2 = _cloudverseContext.Folders.First(res => res.Id == id);
            res2.IsDeleted = false;
            _cloudverseContext.Folders.Update(res2);
            _cloudverseContext.SaveChanges();
        }

        [HttpPut("folderfav/{id}")]
        public void modifyfav(int id)
        {
            var res1 = _cloudverseContext.Documents.Where(res => res.FolderId == id).ToList();
            res1.ForEach(res => res.IsFavourite = true);
            res1.ForEach(res => _cloudverseContext.Documents.Update(res));
            _cloudverseContext.SaveChanges();

            var res2 = _cloudverseContext.Folders.First(res => res.Id == id);
            res2.IsFavourite = true;
            _cloudverseContext.Folders.Update(res2);
            _cloudverseContext.SaveChanges();
        }
        [HttpPut("folderremfav/{id}")]
        public void modifyRemfav(int id)
        {
            var res1 = _cloudverseContext.Documents.Where(res => res.FolderId == id).ToList();
            res1.ForEach(res => res.IsFavourite = false);
            res1.ForEach(res => _cloudverseContext.Documents.Update(res));
            _cloudverseContext.SaveChanges();

            var res2 = _cloudverseContext.Folders.First(res => res.Id == id);
            res2.IsFavourite = false;
            _cloudverseContext.Folders.Update(res2);
            _cloudverseContext.SaveChanges();
        }



        [HttpGet("Recent/{userId}/{folderId}/{time}")]
        public IActionResult showRecent(int userId, int folderId, int time)
        {
            int m = 0;
            try
            {

                if (time == 1)
                {
                    var createdAt = DateTime.Now.AddHours(-1);

                    var res = _cloudverseContext.Documents.Where(obj => obj.CreatedAt >= createdAt && obj.CreatedBy == userId && obj.FolderId == folderId && obj.IsDeleted == false).ToList();
                    return Ok(res);
                }
                else if (time == 6)
                {
                    var createdAt = DateTime.Now.AddHours(-6);

                    var res = _cloudverseContext.Documents.Where(obj => obj.CreatedAt >= createdAt && obj.CreatedBy == userId && obj.FolderId == folderId && obj.IsDeleted == false).ToList();
                    return Ok(res);
                }
                else if (time == 12)
                {
                    var createdAt = DateTime.Now.AddHours(-12);

                    var res = _cloudverseContext.Documents.Where(obj => obj.CreatedAt >= createdAt && obj.CreatedBy == userId && obj.FolderId == folderId && obj.IsDeleted == false).ToList();
                    return Ok(res);
                }
                else
                {
                    var createdAt = DateTime.Now.AddHours(-24);

                    var res = _cloudverseContext.Documents.Where(obj => obj.CreatedAt >= createdAt && obj.CreatedBy == userId && obj.FolderId == folderId && obj.IsDeleted == false).ToList();
                    return Ok(res);
                }

            }
            catch (Exception e)
            {
                m = 404;
                return StatusCode(m);
            }

        }

    


// DELETE: api/ApiWithActions/5
[HttpDelete("delete/{id}")]
        public void Delete(int id)
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


