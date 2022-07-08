using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cgdocs1.RequestModel
{
    public class file
    {
        public string DName { get; set; }
        public string ContentType { get; set; }
        public int Size { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public int FolderId { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsFavourite { get; set; }
    }
}
