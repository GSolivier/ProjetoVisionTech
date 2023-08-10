using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VisionTechAPI.Models;

namespace VisionTechAPI.Data.Map
{
    public class FuncionarioMap : IEntityTypeConfiguration<Funcionario>
    {
        public void Configure(EntityTypeBuilder<Funcionario> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).HasMaxLength(255);
            builder.Property(x => x.RG).HasMaxLength(255);
            builder.Property(x => x.Foto).HasMaxLength(255);
            builder.Property(x => x.DepartamentoId);

            builder.HasOne(x => x.Departamento);
        }
    }
}