import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { Funcionario } from '../models/Funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
import { DepartamentoService } from './departamento.service';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { NavService } from '../nav/nav.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public departamentoForm: FormGroup;
  public funcionarioForm: FormGroup;
  public title = 'Departamentos';
  public departamentoSelecionado: Departamento;
  public funcionarioSelected: Funcionario;
  public departamentos: Departamento[];
  public funcionarios: Funcionario[];
  public modo: string;
  modalRef?: BsModalRef;
  novaFoto: string;

  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();


  constructor( private fb: FormBuilder, private fbF: FormBuilder, private departamentoService: DepartamentoService,private funcionarioService: FuncionarioService, private modalService: BsModalService, public nav: NavService, private http: HttpClient) { 

    this.createForm();
    this.createFormF();

  }

  ngOnInit() {
    this.nav.hide()
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

  departamentoNew(){
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


  //*********************************************************** */


  updateFotoValue(fileName: string) {
    this.funcionarioForm.get('foto').setValue(fileName);
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

  createFormF() {
    this.funcionarioForm = this.fbF.group({
      id: [''],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      foto: ['', Validators.required],
      departamentoId: [ '' , Validators.required]
    });
  }

  funcionarioSave(funcionario: Funcionario, files){
    
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
        this.novaFoto = `${funcionario.id}${funcionario.foto}`
        funcionario.foto = this.novaFoto

        let fileName: string;
        if (files.length === 0) {
          return;
        }
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, `${funcionario.id}${fileToUpload.name}`);
        
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


        console.log(funcionario)
        this.loadFuncionario()
       this.funcionarioSelected = null;
      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  funcionarioSubmit(files: any){
    this.funcionarioSave(this.funcionarioForm.value, files)
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

  backF()
  {
    this.funcionarioSelected = null;
  }


  public createImgPath = (id: number, foto: string) => { 
    return `http://localhost:5058/Resources/Images/${id}${foto}`; 
  }

  uploadSingle(event) {
    const fileName = event.target.files[0].name;
  }


}
