using API.Controllers.Common;
using Application.Features.Profiles.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpGet("{userName}")]
    public async Task<IActionResult> GetProfile(string userName)
    {
        var result = await Mediator.Send(new Details.Query {UserName = userName});

        return HandleResult(result);
    }
}