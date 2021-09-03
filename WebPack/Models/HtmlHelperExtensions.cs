using System.Text;
using System.Web.Mvc;

namespace WebPack.Models
{
    public static class HtmlHelperExtensions
    {
        public static MvcHtmlString RenderBundles<TModel>(this HtmlHelper<TModel> html)
        {
            var controllerName = html.ViewContext.RouteData.Values["controller"];
            var actionName = html.ViewContext.RouteData.Values["action"];

            var output = new StringBuilder();

            output.Append(RenderBundle("vendor"));
            output.Append(RenderBundle($"{controllerName}/{actionName}"));

            return new MvcHtmlString(output.ToString());
        }

        private static string RenderBundle(string bundleName)
        {
            var output = new StringBuilder();

            var jsFiles = WebpackBundles.GetJsFiles(bundleName);

            foreach (var file in jsFiles)
            {
                output.AppendLine($"<script defer src='assets/js/{file}'></script>");
            }

            return output.ToString();
        }
    }
}