using Chess.Gateways.Models;

namespace Chess.Gateways
{
    public interface IChessService
    {
        void Game();

        MovementResult Move(MovementState state);
    }
}