using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Simple.Model;

namespace Simple.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return JsonConvert.SerializeObject(UserInfoRepository.LoadAll());
        }

        [HttpGet("{uuid}")]
        public string Get(string uuid)
        {
            return JsonConvert.SerializeObject(UserInfoRepository.Get(uuid));
        }

        [HttpGet("p/")]
        public string Get(string name, int page = 1, int pagesize = 20)
        {
            long count = 0;
            var list = UserInfoRepository.LoadAll();
            count = list.Count;
            var obj = new
            {
                total = count,
                list = list.Where(m => (m.real_name.Equals(name)||string.IsNullOrEmpty(name))).Skip((page - 1) * pagesize).Take(pagesize)
            };
            return JsonConvert.SerializeObject(obj);
        }

        [HttpPost]
        public void Post([FromBody]UserInfo user)
        {
            UserInfoRepository.Insert(user);
        }

        [HttpPut]
        public void Put([FromBody]UserInfo user)
        {
            UserInfoRepository.Update(user);
        }

        [HttpDelete("{uuid}")]
        public void Delete(string uuid)
        {
            UserInfoRepository.Delete(uuid);
        }
    }
}
