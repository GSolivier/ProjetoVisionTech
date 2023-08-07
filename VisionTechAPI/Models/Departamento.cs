using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VisionTechAPI.Models
{
    public class Departamento
    {

        public Departamento()
        {
            
        }

        
        public Departamento(int id, string nome, string sigla) 
        {
            this.Id = id;
            this.Nome = nome;
            this.Sigla = sigla;
        }
        [Key]
        public int Id { get; set; }

        public string? Nome { get; set; }
        public string? Sigla { get; set; }

        public ICollection<Funcionario>? Funcionario { get; set; }
    }
}