using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cgdocs1.RequestModel
{
    public class folder
    {
        
        public string FName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsFavourite { get; set; }
    }
}
