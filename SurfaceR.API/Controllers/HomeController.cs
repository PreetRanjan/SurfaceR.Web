using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Tilter.API.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Surface1()
        {
            return View();
        }
        public IActionResult Cube()
        {
            return View();
        }
        public IActionResult Surface2()
        {
            return View();
        }
        public IActionResult Controls()
        {
            return View();
        }
        public IActionResult Test()
        {
            return View();
        }
        public IActionResult DeviceOrient()
        {
            return View();
        }
        
    }
}
