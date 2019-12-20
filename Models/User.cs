using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngProject.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobilePhone { get; set; }
        public int Role { get; set; }
    }
}