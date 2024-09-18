using Microsoft.AspNetCore.Mvc;

namespace Shop.Front
{

    public class LoginController : Controller
    {
        
        public ViewResult Login()
        {
            return View();
        }
        // public ViewResult Logout()
        // {
        //     return View();
        // }
    }
}