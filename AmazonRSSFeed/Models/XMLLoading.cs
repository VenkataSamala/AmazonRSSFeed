using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace AmazonRSSFeed.Models
{
    public class XMLLoading
    {
        public static List<Feeds> LoadFeeds(string inputText)
        {
            string url = String.Format("https://www.amazon.com/gp/rss/bestsellers/" + inputText);
            XDocument xdoc = new XDocument();
            xdoc = XDocument.Load(url);
            // var json = JsonConvert.SerializeXmlNode(xdoc.Descendan);
            var items = (from x in xdoc.Descendants("item")
                select new Feeds
                {
                    Title = x.Element("title").Value,
                    PublishDate = x.Element("pubDate").Value,
                    Description = x.Element("description").Value
                }).ToList();

            return items;
        }
    }
}