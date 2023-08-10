using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisionTechAPI.Models;

namespace VisionTechAPI.Repository.Interfaces
{
    public interface IDepartamento
    {
        Task <List<Departamento>> GetDepartamentos();
        Task <Departamento> GetDepartamentoById(int id);
        Task <Departamento> AddDepartamento(Departamento departamento);
        Task <Departamento> UpdateDepartamento (Departamento departamento, int id);
        Task <bool> DeleteDepartamento (int id);
    }
}