using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Activities.Queries;

public class List
{
    public class Query : IRequest<Result<List<Activity>>> {}
    
    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
        private readonly DataDbContext _context;

        public Handler(DataDbContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            
            var result = Result<List<Activity>>.Success(activities);

            return result;
        }
    }
}