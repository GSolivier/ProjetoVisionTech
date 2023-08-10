using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VisionTechAPI.Models;
using VisionTechAPI.Repository.Interfaces;

namespace VisionTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : ControllerBase
    {
        private readonly IFuncionario _iFuncionario;
        public FuncionarioController(IFuncionario iFuncionario)
        {
            _iFuncionario = iFuncionario;
        }

        [HttpGet]
        public async Task<ActionResult<List<Funcionario>>> Listar()
        {
            List<Funcionario> funcionarios = await _iFuncionario.GetFuncionarios();
            return Ok(funcionarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Funcionario>> BuscarFuncionario(int id)
        {
            Funcionario funcionario = await _iFuncionario.GetFuncionarioById(id);
            return Ok(funcionario);
        }

        [HttpPost]

        public async Task<ActionResult<Funcionario>> Cadastrar([FromBody] Funcionario funcionario) {
            
            Funcionario novoFuncionario = await _iFuncionario.AddFuncionario(funcionario);

            return Ok(novoFuncionario);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Funcionario>> Atualizar([FromBody] Funcionario funcionario, int id) {
            
            funcionario.Id = id;

            Funcionario novoFuncionario = await _iFuncionario.UpdateFuncionario(funcionario, id);

            return Ok(novoFuncionario);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Funcionario>> Apagar(int id) {
            
            bool apagado = await _iFuncionario.DeleteFuncionario(id);

            return Ok(apagado);
        }
    }
}