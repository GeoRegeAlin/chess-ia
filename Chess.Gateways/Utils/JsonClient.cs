using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Chess.Gateways.Utils
{
    public class JsonClient : IJsonClient
    {
        private readonly HttpClient httpClient;

        private const string ApplicationJson = "application/json";

        private JsonSerializerSettings SerializerSettings =>
            new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

        public JsonClient()
        {
            httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(ApplicationJson));
        }

        public T Get<T>(Uri uri)
            where T : class 
        {
            var call = httpClient.GetAsync(uri);
            var result = call.Result;
            var responseContent = result.Content.ReadAsStringAsync().Result;

            return JsonConvert.DeserializeObject<T>(responseContent, SerializerSettings);
        }

        public T Post<T>(Uri uri, object body) where T : class
        {
            var bodySerialized = JsonConvert.SerializeObject(body, SerializerSettings);
            var bodyAsApplicationJsonContent = new StringContent(bodySerialized, Encoding.UTF8, ApplicationJson);
            var call = httpClient.PostAsync(uri, bodyAsApplicationJsonContent);
            var result = call.Result;
            var responseContent = result.Content.ReadAsStringAsync().Result;

            return JsonConvert.DeserializeObject<T>(responseContent, SerializerSettings);
        }
    }
}