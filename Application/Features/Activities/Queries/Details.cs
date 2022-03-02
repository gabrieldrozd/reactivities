using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Features.Activities.Queries;

public class Details
{
    public class Query : IRequest<Result<Activity>>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, Result<Activity>>
    {
        private readonly DataDbContext _context;

        public Handler(DataDbContext context)
        {
            _context = context;
        }

        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);

            var result = Result<Activity>.Success(activity);

            return result;
        }
    }
}