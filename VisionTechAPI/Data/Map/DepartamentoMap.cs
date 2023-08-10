using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisionTechAPI.Models;

namespace VisionTechAPI.Data.Map
{
    public class DepartamentoMap : IEntityTypeConfiguration<Departamento>
    {
        public void Configure(EntityTypeBuilder<Departamento> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).HasMaxLength(255);
            builder.Property(x => x.Sigla).HasMaxLength(255);
        }
    }
}