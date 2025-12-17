using Microsoft.EntityFrameworkCore;
using Gtech_Manager_Backend.Models;

namespace Gtech_Manager_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {}

        public DbSet<Cliente> Clientes => Set<Cliente>();
    }

}
