using Microsoft.AspNetCore.Mvc;

namespace Chess.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet("game")]
        public IActionResult GetGameInfo()
        {
            return Ok("No game info yet!");
        }

        [HttpGet]
        public IActionResult GetMoveInfo()
        {
            return Ok("No moe info yet!");
        }
    }
}
