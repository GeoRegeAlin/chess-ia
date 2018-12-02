namespace Chess.Gateways.Models
{
    public class MovementState
    {
        public string GameBoardAsFen { get; private set; }

        public string ChessPieceName { get; private set; }

        public string CurrentPieceCoordintates { get; private set; }
    }
}