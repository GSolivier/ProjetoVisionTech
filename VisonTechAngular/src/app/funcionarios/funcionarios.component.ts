import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  public funcionarioForm: FormGroup;
  titulo = 'Funcionários';
  funcionarioSelecionado: Funcionario;

  funcionarios = [
    {id: 1, nome:'Cleber', RG: '3333333', foto: 'imagem.png', DepartamentoId: 1},
    {id: 2, nome:'Carlos', RG: '34343333', foto: 'imagem.png', DepartamentoId: 2},
    {id: 3, nome:'Adriana', RG: '9087343333', foto: 'imagem.png', DepartamentoId: 3},
    {id: 4, nome:'Alan', RG: '987089', foto: 'imagem.png', DepartamentoId: 4},
    {id: 5, nome:'Flávia', RG: '33098', foto: 'imagem.png', DepartamentoId: 5},
    {id: 6, nome:'Ademar', RG: '3330887', foto: 'imagem.png', DepartamentoId: 6},
  ]
  
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      RG: ['', Validators.required],
      foto: ['', Validators.required],
      DepartamentoId: ['', Validators.required]
    });
  }

  funcionarioSubmit(){
    console.log(this.funcionarioForm.value);
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
