import { Component, OnInit, TemplateRef } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public departamentoForm: FormGroup;
  titulo = 'Departamentos';
  public departamentoSelecionado: Departamento;

  departamentos = [

    {id: 1, nome: 'Administrativo', sigla: 'ADM'},
    {id: 2, nome: 'Financeiro', sigla: 'FIN'},
    {id: 3, nome: 'Pessoal', sigla: 'PES'},
    {id: 4, nome: 'Comercial', sigla: 'COM'},
    {id: 5, nome: 'Marketing', sigla: 'MAR'},
    {id: 6, nome: 'Produção', sigla: 'PRO'},
    {id: 7, nome: 'Jurídico', sigla: 'JUR'},
  ];



  constructor( private fb: FormBuilder) { 

    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.departamentoForm = this.fb.group({
      nome: ['', Validators.required],
      sigla: ['', Validators.required]
    })
  }

  departamentoSubmit(){
    console.log(this.departamentoForm.value)
  }

  departamentoSelect(departamento: Departamento){
      this.departamentoSelecionado = departamento;
      this.departamentoForm.patchValue(departamento)
  }

  public back(){
    this.departamentoSelecionado = null;
  }



}
