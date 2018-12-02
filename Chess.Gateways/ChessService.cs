using Chess.Gateways.Settings;
using Chess.Gateways.Utils;

namespace Chess.Gateways
{
    public class ChessService : IChessService
    {
        private readonly IJsonClient client;
        private readonly ChessEndpoints endpoints;

        public ChessService(IJsonClient client, ChessEndpoints endpoints)
        {
            this.client = client;
            this.endpoints = endpoints;
        }

        public void Game()
        {
            throw new System.NotImplementedException();
        }

        public void Move()
        {
            throw new System.NotImplementedException();
        }
    }
}
