using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Activities.Queries;

public class List
{
    public class Query : IRequest<List<Activity>> {}
    
    public class Handler : IRequestHandler<Query, List<Activity>>
    {
        private readonly DataDbContext _context;

        public Handler(DataDbContext context)
        {
            _context = context;
        }

        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.ToListAsync(cancellationToken);
        }
    }
}