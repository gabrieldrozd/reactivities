﻿using API.Controllers.Common;
using Application.Features.Photos.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PhotosController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> AddPhoto([FromForm] Add.Command command)
    {
        var result = await Mediator.Send(command);

        return HandleResult(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePhoto(string id)
    {
        var result = await Mediator.Send(new Delete.Command {Id = id});

        return HandleResult(result);
    }

    [HttpPost("{id}/setMain")]
    public async Task<IActionResult> SetMainPhoto(string id)
    {
        var result = await Mediator.Send(new SetMain.Command {Id = id});

        return HandleResult(result);
    }
}