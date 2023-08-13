import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { Departamento } from '../models/Departamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';
import { DepartamentoService } from '../departamentos/departamento.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})

export class FuncionariosComponent implements OnInit {

  public funcionarioForm: FormGroup;
  public title = 'Funcionários';
  public funcionarioSelected: Funcionario;
  public funcionarios: Funcionario[]
  public departamentos: Departamento[];
  public departamentoSelected: Departamento;
  public modo: string;


  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private fb: FormBuilder, private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService) { 
    this.createForm();
  }

  ngOnInit() {
    this.loadFuncionario();
    this.loadDepartamentos();
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

  createForm() {
    this.funcionarioForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      foto: ['', Validators.required],
      departamentoId: [ '' , Validators.required]
    });
  }

  funcionarioSave(funcionario: Funcionario){
    if(funcionario.id == 0)
    {
      this.modo = 'post';
    }
    else
    {
      this.modo = 'put';
    }

    this.funcionarioService[this.modo](funcionario).subscribe(
      (funcionario: Funcionario) => {
        console.log(funcionario)
        this.loadFuncionario()
       this.funcionarioSelected = null;
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
    this.funcionarioSelected = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }

  funcionarioNew(){
    this.funcionarioSelected = new Funcionario();
    this.funcionarioForm.patchValue(this.funcionarioSelected);

  }

  funcionarioDelete(id: number){
    this.funcionarioService.delete(id).subscribe(
      (model) => {
        console.log(model)
        this.loadFuncionario();
      },
      (erro: any) => {
        console.log(erro)
      }

    )
  }

  back()
  {
    this.funcionarioSelected = null;
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('http://localhost:5058/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
    

  }

