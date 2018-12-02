using Chess.Gateways.Models;
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

        public string Move(MovementState movementState)
        {
            return "No movement info yet!";
        }
    }
}
