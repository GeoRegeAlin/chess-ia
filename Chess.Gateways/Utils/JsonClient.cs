using System;
using System.Net.Http;
using Newtonsoft.Json;

namespace Chess.Gateways.Utils
{
    public class JsonClient
    {
        public T Get<T>(Uri uri)
            where T : class 
        {
            using (var httpClient = new HttpClient())
            {
                var call = httpClient.GetAsync(uri);
                var result = call.Result;
                var responseContent = result.Content.ReadAsStringAsync().Result;

                return JsonConvert.DeserializeObject<T>(responseContent);
            }
        }
    }
}