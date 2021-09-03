using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebPack.Models
{
    public static class WebpackBundles
    {
        private static Dictionary<string, List<string>> bundles = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase);

        public static void Init()
        {
            using (var fs = File.OpenRead(HostingEnvironment.MapPath("/bundles.json")))
            using (var sr = new StreamReader(fs))
            using (var reader = new JsonTextReader(sr))
            {
                dynamic chunks = JObject.Load(reader);
                foreach (var chunk in chunks)
                {
                    var files = new List<string>();

                    foreach (var file in chunk.Value.js)
                    {
                        files.Add(file.Value);
                    }

                    bundles.Add(chunk.Name, files);
                }
            }
        }

        public static List<string> GetJsFiles(string filename)
        {
            return bundles[filename];
        }
    }
}