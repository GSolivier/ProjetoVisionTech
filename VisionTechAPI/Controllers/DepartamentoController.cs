using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VisionTechAPI.Models;
using VisionTechAPI.Repository.Interfaces;

namespace VisionTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartamentoController : ControllerBase
    {
        private readonly IDepartamento _iDepartamento;
        public DepartamentoController(IDepartamento iDepartamento)
        {
            _iDepartamento = iDepartamento;
        }

        [HttpGet]
        public async Task<ActionResult<List<Departamento>>> Listar()
        {
            List<Departamento> departamentos = await _iDepartamento.GetDepartamentos();
            return Ok(departamentos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Departamento>> BuscarDepartamento(int id)
        {
            Departamento departamento = await _iDepartamento.GetDepartamentoById(id);
            return Ok(departamento);
        }

        [HttpPost]

        public async Task<ActionResult<Departamento>> Cadastrar([FromBody] Departamento departamento) {
            
            Departamento novoDepartamento = await _iDepartamento.AddDepartamento(departamento);

            return Ok(novoDepartamento);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Departamento>> Atualizar([FromBody] Departamento departamento, int id) {
            
            departamento.Id = id;

            Departamento novoDepartamento = await _iDepartamento.UpdateDepartamento(departamento, id);

            return Ok(novoDepartamento);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Funcionario>> Apagar(int id) {
            
            bool apagado = await _iDepartamento.DeleteDepartamento(id);

            return Ok(apagado);
        }
    }
}