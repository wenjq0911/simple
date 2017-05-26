using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simple.Model
{
    public class UserInfo
    {
        public string uuid { get; set; }
        public string login_name { get; set; }
        public string real_name { get; set; }
        public string email { get; set; }
        public string birthday { get; set; }
        public int age { get; set; }
    }
}
