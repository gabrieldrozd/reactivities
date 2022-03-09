using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Profiles.Queries;

public class Details
{
    public class Query : IRequest<Result<Profile>>
    {
        public string UserName { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, Result<Profile>>
    {
        private readonly DataDbContext _context;
        private readonly IMapper _mapper;

        public Handler(DataDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.UserName == request.UserName);

            return Result<Profile>.Success(user);
        }
    }
}