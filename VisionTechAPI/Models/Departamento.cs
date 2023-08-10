using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VisionTechAPI.Models
{
    public class Departamento
    {

        public int Id { get; set; }

        public string? Nome { get; set; }
        public string? Sigla { get; set; }

        public List<Funcionario>? Funcionarios { get; set; }

        // public ICollection<Funcionario>? Funcionario { get; set; }
    }
}