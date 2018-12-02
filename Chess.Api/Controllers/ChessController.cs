using Chess.Gateways;
using Chess.Gateways.Models;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Api.Controllers
{
    [Route("api/chess")]
    [ApiController]
    public class ChessController : ControllerBase
    {
        private readonly IChessService chessService;

        public ChessController(IChessService chessService)
        {
            this.chessService = chessService;
        }

        [HttpPost("move")]
        public IActionResult GetMoveInfo([FromBody] MovementState movementState)
        {
            var result = chessService.Move(movementState);
            return Ok(result);
        }

        [HttpPost("game")]
        public IActionResult GetGameInfo()
        {
            return Ok("No game info yet!");
        }
    }
}
