using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataDbContext : DbContext
{
    public DataDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Activity> Activities { get; set; }
}