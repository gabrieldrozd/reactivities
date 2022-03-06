using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Activities.Queries;

public class List
{
    public class Query : IRequest<Result<List<ActivityDto>>> {}
    
    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataDbContext _context;
        private readonly IMapper _mapper;

        public Handler(DataDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            
            var result = Result<List<ActivityDto>>.Success(activities);

            return result;
        }
    }
}