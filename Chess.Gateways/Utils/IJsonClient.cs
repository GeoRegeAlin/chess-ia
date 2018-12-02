using System;

namespace Chess.Gateways.Utils
{
    public interface IJsonClient
    {
        T Get<T>(Uri uri)
            where T : class;

        T Post<T>(Uri uri, object body)
            where T : class;
    }
}