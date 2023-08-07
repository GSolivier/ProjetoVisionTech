using Microsoft.EntityFrameworkCore;
using VisionTechAPI.Models;

namespace VisionTechAPI.Data
{
    public class DataContext : DbContext
    {

        public DataContext()
        {
            
        }

        public DataContext(DbContextOptions options) : base (options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source = Guilherme; Initial Catalog = VisionTech; User Id = sa; pwd = Senai@134; TrustServerCertificate = true");
            }
        }

        public DbSet<Funcionario> Funcionario { get; set; }
        public DbSet<Departamento> Departamento { get; set; }
        
    }
}