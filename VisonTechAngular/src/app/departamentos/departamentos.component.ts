import { Component, OnInit, TemplateRef } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
import { DepartamentoService } from './departamento.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public departamentoForm: FormGroup;
  titulo = 'Departamentos';
  public departamentoSelecionado: Departamento;

  public departamentos: Departamento[];



  constructor( private fb: FormBuilder, private departamentoService: DepartamentoService) { 

    this.createForm();
  }

  ngOnInit() {
    this.carregarDepartamento()
  }

  createForm() {
    this.departamentoForm = this.fb.group({
      id: [''],
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

  carregarDepartamento(){
    this.departamentoService.getAll().subscribe(
      (departamento: Departamento[]) => {
        this.departamentos = departamento
      },
      (erro: any) => {
        console.error(erro)
      }
    )
  }

}
