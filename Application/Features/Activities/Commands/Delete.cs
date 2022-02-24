using MediatR;
using Persistence;

namespace Application.Features.Activities.Commands;

public class Delete
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
    }
    
    public class Handler : IRequestHandler<Command>
    {
        private readonly DataDbContext _context;

        public Handler(DataDbContext context)
        {
            _context = context;
        }
        
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);

            _context.Remove(activity);

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}