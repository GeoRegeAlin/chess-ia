using Microsoft.AspNetCore.Mvc;

namespace Chess.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
