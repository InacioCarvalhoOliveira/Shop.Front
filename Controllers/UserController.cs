using Microsoft.AspNetCore.Mvc;

namespace Shop.Front.Controllers
{
    public class UserController : Controller
    {
        public ViewResult Product()
        {
            return View();
        }
    }   
}