import { Component, OnInit, TemplateRef } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { Funcionario } from '../models/Funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
import { DepartamentoService } from './departamento.service';
import { FuncionarioService } from '../funcionarios/funcionario.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public departamentoForm: FormGroup;
  public title = 'Departamentos';
  public departamentoSelecionado: Departamento;
  public funcionarioSelected: Funcionario;
  public departamentos: Departamento[];
  public funcionarios: Funcionario[];
  public modo: string;
  modalRef?: BsModalRef;

  constructor( private fb: FormBuilder, private departamentoService: DepartamentoService,private funcionarioService: FuncionarioService, private modalService: BsModalService) { 

    this.createForm();

  }

  ngOnInit() {
    
    this.loadDepartamentos()
    this.loadFuncionario()
  }

  createForm() {
    this.departamentoForm = this.fb.group({

      id: [''],
      nome: ['', Validators.required],
      sigla: ['', Validators.required]

    })
  }

  
  openModal(template: TemplateRef<any>, departamento: Departamento) {
    this.modalRef = this.modalService.show(template);
    this.departamentoSelecionado = departamento;
    this.departamentoForm.patchValue(departamento)
  }

  departamentoSave(departamento: Departamento){

    if(departamento.id == 0)
    {
      this.modo = 'post'
    }
    else
    {
      this.modo = 'put'
    }

    this.departamentoService[this.modo](departamento).subscribe(

      (departamento: Departamento) => {

        console.log(Departamento)
        this.loadDepartamentos()
       this.departamentoSelecionado = null;

      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  departamentoSubmit(){
    this.departamentoSave(this.departamentoForm.value)
  }

  departamentoSelect(departamento: Departamento){
      this.departamentoSelecionado = departamento;
      this.departamentoForm.patchValue(departamento)
  }

  departamentoNew(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.departamentoSelecionado = new Departamento();
    this.departamentoForm.patchValue(this.departamentoSelecionado)
  }

  departamentoDelete(id: number){
    this.departamentoService.delete(id).subscribe(
      (model: boolean) => {
        console.log(model)
        this.loadDepartamentos()
      },
      () => {}
    )
  }

  back(){
    this.departamentoSelecionado = null;
  }

  loadDepartamentos(){
    this.departamentoService.getAll().subscribe(
      (departamento: Departamento[]) => {
        this.departamentos = departamento
      },
      (erro: any) => {
        console.error(erro)
      }
    )
  }

  loadFuncionario()
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



}
