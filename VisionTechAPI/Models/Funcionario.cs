using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace VisionTechAPI.Models
{
    public class Funcionario
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Foto { get; set; }
        public string? RG { get; set; }
        
        public int DepartamentoId { get; set; }

        [JsonIgnore]
        public virtual Departamento? Departamento { get; set; }
    }
}