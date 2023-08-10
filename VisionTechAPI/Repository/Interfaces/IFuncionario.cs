using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisionTechAPI.Models;

namespace VisionTechAPI.Repository.Interfaces
{
    public interface IFuncionario
    {
        Task <List<Funcionario>> GetFuncionarios();
        Task <Funcionario> GetFuncionarioById(int id);
        Task <Funcionario> AddFuncionario(Funcionario funcionario);
        Task <Funcionario> UpdateFuncionario (Funcionario funcionario, int id);
        Task <bool> DeleteFuncionario (int id);
    }
}