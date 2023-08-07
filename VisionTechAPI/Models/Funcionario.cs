using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VisionTechAPI.Models
{
    public class Funcionario
    {
        public Funcionario() { }
        public Funcionario(int id, string nome, string foto, string rg, int departamentoId) 
        {
            this.Id = id;
            this.Nome = nome;
            this.Foto = foto;
            this.RG = rg;
            this.DepartamentoId = departamentoId;
   
        }

        [Key]
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Foto { get; set; }
        public string? RG { get; set; }
        
        [ForeignKey("Departamento")]
        public int DepartamentoId { get; set; }

        public Departamento? Departamento { get; set; }
    }
}