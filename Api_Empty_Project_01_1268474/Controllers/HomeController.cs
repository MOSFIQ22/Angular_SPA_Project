using Microsoft.AspNetCore.Mvc;

namespace Api_Empty_Project_01_1268474.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
