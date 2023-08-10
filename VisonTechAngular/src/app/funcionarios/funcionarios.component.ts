import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  public funcionarioForm: FormGroup;
  titulo = 'Funcionários';
  funcionarioSelecionado: Funcionario;

  arr: Funcionario[] = [];
  
  public funcionarios = this.arr;

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService) { 
    this.createForm();


  }

  ngOnInit() {
    this.carregarFuncionario();
  }

  carregarFuncionario()
  {
    this.funcionarioService.getAll().subscribe(
      (funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
      },
      (erro: any) => {
        console.error("ERRASSOOOOO: " + erro);
      }
    )
  }

  createForm() {
    this.funcionarioForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      foto: ['', Validators.required],
      departamentoId: ['', Validators.required]
    });
  }

  funcionarioSave(funcionario: Funcionario){
    this.funcionarioService.put(funcionario.id, funcionario).subscribe(
      (funcionario: Funcionario) => {
        console.log(funcionario)
        this.carregarFuncionario()
       this.funcionarioSelecionado = null;
      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  funcionarioSubmit(){
    this.funcionarioSave(this.funcionarioForm.value)
    
  }

  funcionarioSelect(funcionario: Funcionario){
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  back()
  {
    this.funcionarioSelecionado = null;
  }


}
