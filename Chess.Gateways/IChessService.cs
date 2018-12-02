using Chess.Gateways.Models;

namespace Chess.Gateways
{
    public interface IChessService
    {
        void Game();

        string Move(MovementState state);
    }
}