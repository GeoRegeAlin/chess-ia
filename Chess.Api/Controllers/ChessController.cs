using Microsoft.AspNetCore.Mvc;

namespace Chess.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpPost("move")]
        public IActionResult GetMoveInfo()
        {
            return Ok("No moe info yet!");
        }

        [HttpPost("game")]
        public IActionResult GetGameInfo()
        {
            return Ok("No game info yet!");
        }
    }
}
