using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebPack.Models;

namespace WebPack.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var vm = new IndexViewModel
            {
                Title = "Hello World"
            };

            return View(vm);
        }

        public ActionResult AboutUs()
        {
            return View();
        }
    }
}