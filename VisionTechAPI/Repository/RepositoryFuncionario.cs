
using Microsoft.EntityFrameworkCore;
using VisionTechAPI.Data;
using VisionTechAPI.Models;
using VisionTechAPI.Repository.Interfaces;

namespace VisionTechAPI.Repository
{
    public class RepositoryFuncionario : IFuncionario
    {
        private readonly DataContext _dbContext;

        public RepositoryFuncionario(DataContext dataContext)
        {
            _dbContext = dataContext;
        }

        public async Task<Funcionario> GetFuncionarioById(int id)
        {
            return await _dbContext.Funcionario
            .Include(x => x.Departamento)
            .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Funcionario>> GetFuncionarios()
        {
            return await _dbContext.Funcionario
            .Include(x => x.Departamento)
            .ToListAsync();
        }

        public async Task<Funcionario> AddFuncionario(Funcionario funcionario)
        {
            
           await _dbContext.Funcionario.AddAsync(funcionario);
            await _dbContext.SaveChangesAsync();

            return funcionario;
        }

        public async Task<bool> DeleteFuncionario(int id)
        {
            Funcionario funcionarioId = await GetFuncionarioById(id);

            if (funcionarioId == null)
            {
                throw new Exception($"Funcionário com o ID {id} não encontrado");
            }

            _dbContext.Funcionario.Remove(funcionarioId);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<Funcionario> UpdateFuncionario(Funcionario funcionario, int id)
        {
            Funcionario funcionarioId = await GetFuncionarioById(id);

            if (funcionarioId == null)
            {
                throw new Exception($"Funcionário com o ID {id} não encontrado");
            }

            funcionarioId.Nome = funcionario.Nome;
            funcionarioId.RG = funcionario.RG;
            funcionarioId.Foto = funcionario.Foto;
            funcionarioId.DepartamentoId = funcionario.DepartamentoId;

            _dbContext.Funcionario.Update(funcionarioId);
            await _dbContext.SaveChangesAsync();

            return funcionarioId;
        }
    }
}