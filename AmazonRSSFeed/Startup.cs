using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AmazonRSSFeed.Startup))]
namespace AmazonRSSFeed
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
