using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using cgdocs1.Models;
using cgdocs1.RequestModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Http;

namespace cgdocs1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class filesController : ControllerBase
    {
        private readonly cloudverseContext _cloudversecontext;
        private readonly IHostingEnvironment _environment;
        

        public filesController(cloudverseContext cloudverseContext, IHostingEnvironment environment)
        {
            _cloudversecontext = cloudverseContext;
            _environment = environment;
        }



        // GET: api/folder

        [HttpGet]
        public IActionResult getfilelist()
        {
            var getfiles = _cloudversecontext.Documents.ToList();
            return Ok(getfiles);
        }

        // GET: api/folder/5
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {

            var result = _cloudversecontext.Documents.Where(obj => obj.FolderId == id && obj.IsDeleted==false);
            return Ok(result);

        }

        [HttpGet("files/{id}/{value}")]
        public IActionResult Get(int id, string value)
        {


            var result = _cloudversecontext.Documents.Where(obj => (obj.DName.Contains(value) && obj.FolderId == id && obj.IsDeleted==false));
            return Ok(result);



        }



        [HttpPost]
        public void Post([FromBody] file value)
        {
            Documents obj = new Documents();

            obj.DName = value.DName;
            obj.ContentType = value.ContentType;
            obj.Size = value.Size;
            obj.CreatedBy = value.CreatedBy;
            obj.CreatedAt = value.CreatedAt;
            obj.FolderId = value.FolderId;
            obj.IsDeleted = value.IsDeleted;
            ;
            _cloudversecontext.Documents.Add(obj);
            _cloudversecontext.SaveChanges();
        }
        // POST: api/files
        [HttpPost]
        [Route("upload/{createdBy}/{createdAt}/{folderId}")]
        public IActionResult post( int createdBy, DateTime createdAt,int folderId)
        {
            //long fsize = files.Sum(f => f.Length);
            if(Request.Form.Files.Count() > 0){
                string abc = "aaa";
            }
            IFormFile file = Request.Form.Files[0];

            var RootPath = Path.Combine(_environment.ContentRootPath, "Resources", "Documents");
            if (!Directory.Exists(RootPath))
                Directory.CreateDirectory(RootPath);
            for(var i= 0;i < Request.Form.Files.Count(); i++)
            {
                var filePath = Path.Combine(RootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {

                    Documents obj = new Documents();
                    {
                        obj.DName = file.FileName;
                        obj.ContentType = file.ContentType;
                        obj.Size = (int)file.Length;
                        obj.CreatedBy = createdBy;
                        obj.CreatedAt = createdAt;
                        obj.FolderId = folderId;
                        obj.IsDeleted = false;
                        obj.IsFavourite = false;





                    };
                    file.CopyTo(stream);
                    _cloudversecontext.Documents.Add(obj);
                    _cloudversecontext.SaveChanges();
                }
            }
                //return Ok(new { count = files.Count, fsize });
                return Ok();
           
        }


        // POST: api/files
        [HttpGet]
        [Route("download/{id}")]
        public async Task<ActionResult> Download(int id)
        {

            var provider = new FileExtensionContentTypeProvider();
            var document = await _cloudversecontext.Documents.FindAsync(id);

            if (document == null)
                return NotFound();

            var file = Path.Combine(_environment.ContentRootPath, "Resources", "Documents", document.DName);

            string contentType = "application/octet-stream";
         
            byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(file);
           
            return Ok( new {filePath=file});
        }



        // PUT: api/files/5
        [HttpPut("del/{id}")]
        public void Put(int id)
        {
            var result2 = _cloudversecontext.Documents.First(res => res.DocId == id);
            result2.IsDeleted = true;
            _cloudversecontext.Documents.Update(result2);
            _cloudversecontext.SaveChanges();


        }

        [HttpPut("restore/{id}")]
        public void restorefile(int id)
        {
            var result2 = _cloudversecontext.Documents.First(res => res.DocId == id);
            result2.IsDeleted = false;
            _cloudversecontext.Documents.Update(result2);
            _cloudversecontext.SaveChanges();


        }

        [HttpPut("filefav/{id}")]
        public void modifyfav(int id)
        {
            var result2 = _cloudversecontext.Documents.First(res => res.DocId == id);
            result2.IsFavourite = true;
            _cloudversecontext.Documents.Update(result2);
            _cloudversecontext.SaveChanges();


        }

        [HttpPut("fileremfav/{id}")]
        public void removefav(int id)
        {
            var result2 = _cloudversecontext.Documents.First(res => res.DocId == id);
            result2.IsFavourite = false;
            _cloudversecontext.Documents.Update(result2);
            _cloudversecontext.SaveChanges();


        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("delete/{id}")]
        public void Delete(int id)
        {
            var result2 = _cloudversecontext.Documents.Where(res => res.DocId == id).ToList();
            result2.ForEach(res => _cloudversecontext.Documents.Remove(res));
            _cloudversecontext.SaveChanges();
        }


        
    }
}
