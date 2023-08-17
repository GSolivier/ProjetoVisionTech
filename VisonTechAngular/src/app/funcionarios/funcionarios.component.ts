import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { Departamento } from '../models/Departamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';
import { DepartamentoService } from '../departamentos/departamento.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { NavService } from '../nav/nav.service';
import { faBuilding, faPlus, faPen, faTrashCan, faArrowLeft, faUser} from '@fortawesome/free-solid-svg-icons';

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
  novaFoto: string;

  faPlus = faPlus
  faArrowLeft = faArrowLeft
  faUser = faUser
  faPen = faPen
  faTrashCan = faTrashCan



  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private fb: FormBuilder, private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService, public nav: NavService) { 
    this.createForm();
  }

  ngOnInit() {
    this.nav.hide()
    this.loadFuncionario();
    this.loadDepartamentos();
  }

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

  createForm() {
    this.funcionarioForm = this.fb.group({
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

  back()
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

