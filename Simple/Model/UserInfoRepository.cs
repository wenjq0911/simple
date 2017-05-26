using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simple.Model
{
    public class UserInfoRepository
    {
        static List<UserInfo> db_users = new List<UserInfo>() {
            /*new UserInfo(){
                 uuid="test",
                  age=20,
                   birthday="1997-01-01",
                    email="test@qq.com",
                     login_name="admin",
                      real_name="管理员"
            }*/
        };

        public static IList<UserInfo> LoadAll() {
            return db_users;
        }
        public static string Insert(UserInfo u)
        {
            u.uuid = Guid.NewGuid().ToString();
            db_users.Add(u);
            return u.uuid;
        }
        public static string Update(UserInfo u)
        {
            db_users.Remove(db_users.Where(m => m.uuid.Equals(u.uuid)).FirstOrDefault());
            db_users.Add(u);
            return u.uuid;
        }
        public static UserInfo Get(string uuid) {
            return db_users.Where(m=>m.uuid.Equals(uuid)).FirstOrDefault();
        }
        public static void Delete(string uuid)
        {
            var u = db_users.Where(m => m.uuid.Equals(uuid)).FirstOrDefault();
            db_users.Remove(u);
        }

    }
}
