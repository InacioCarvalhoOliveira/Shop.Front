using Microsoft.AspNetCore.Mvc;

namespace Shop.Front.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult TestPartial()
        {
            return PartialView("_TestPartial");
        }
    }
}