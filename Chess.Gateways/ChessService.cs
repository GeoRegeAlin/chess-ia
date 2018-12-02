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
        }

        public MovementResult Move(MovementState movementState)
        {
            return new MovementResult
            {
                Result = "No movement result yet!"
            };
        }
    }
}
