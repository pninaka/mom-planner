using Microsoft.EntityFrameworkCore;
using MomPlannerAPI.Models;

namespace MomPlannerAPI.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Child> Children => Set<Child>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<Activity> Activities => Set<Activity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email).IsUnique();

        modelBuilder.Entity<Child>()
            .HasOne(c => c.User)
            .WithMany(u => u.Children)
            .HasForeignKey(c => c.UserId);

        modelBuilder.Entity<Event>()
            .HasOne(e => e.User)
            .WithMany(u => u.Events)
            .HasForeignKey(e => e.UserId);
    }
}
