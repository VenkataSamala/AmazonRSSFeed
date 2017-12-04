using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AmazonRSSFeed.Models;

namespace AmazonRSSFeed.Controllers
{
    public class AmazonController : Controller
    {
        // GET: Amazon
        public ActionResult Index(string inputText)
        {
            return Json(XMLLoading.LoadFeeds(inputText), JsonRequestBehavior.AllowGet);
        }
    }
}