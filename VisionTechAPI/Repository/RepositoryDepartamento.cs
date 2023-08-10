using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VisionTechAPI.Data;
using VisionTechAPI.Models;
using VisionTechAPI.Repository.Interfaces;

namespace VisionTechAPI.Repository
{
    public class RepositoryDepartamento : IDepartamento
    {
        private readonly DataContext _dbContext;

        public RepositoryDepartamento(DataContext dataContext)
        {
            _dbContext = dataContext;
        }

        public async Task<Departamento> GetDepartamentoById(int id)
        {
            return await _dbContext.Departamento.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Departamento>> GetDepartamentos()
        {
            return await _dbContext.Departamento.ToListAsync();
        }
        
        public async Task<Departamento> AddDepartamento(Departamento departamento)
        {
            await _dbContext.Departamento.AddAsync(departamento);
            await _dbContext.SaveChangesAsync();

            return departamento;
        }

        public async Task<bool> DeleteDepartamento(int id)
        {
            Departamento departamentoId = await GetDepartamentoById(id);

            if (departamentoId == null)
            {
                throw new Exception($"Departamento com o ID {id} não encontrado");
            }
            _dbContext.Departamento.Remove(departamentoId);
            await _dbContext.SaveChangesAsync();

            return true;
        }



        public async Task<Departamento> UpdateDepartamento(Departamento departamento, int id)
        {
            Departamento departamentoId = await GetDepartamentoById(id);

            
            if (departamentoId == null)
            {
                throw new Exception($"Departamento com o ID {id} não encontrado");
            }

            departamentoId.Nome = departamento.Nome;
            departamentoId.Sigla = departamento.Sigla;

            _dbContext.Departamento.Update(departamentoId);
            await _dbContext.SaveChangesAsync();

            return departamentoId;
        }
    }
}