import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { Funcionario } from '../models/Funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
import { DepartamentoService } from './departamento.service';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { NavService } from '../nav/nav.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { faBuilding, faPlus, faPen, faTrashCan, faArrowLeft, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

   // Titulo do componente
  public title = 'Departamentos';

   //Declaração dos formularios do componente
  public departamentoForm: FormGroup;
  public funcionarioForm: FormGroup;

  //Variavel para armazenar quando um funcionário ou departamento for selecionado
  public departamentoSelected: Departamento;
  public departamentoSelectedDel: Departamento;
  public funcionarioSelected: Funcionario;

 //Variaveis para armazenar os arrays de departamentos e funcionario
  public departamentos: Departamento[];
  public funcionarios: Funcionario[];

   // string para armazenar o modo: put ou post, na função funcionarioSave()
  public modo: string;

  //Atributo do modal
  modalRef?: BsModalRef;

  //string que muda o nome da foto
  novaFoto: string;

  // icones do fontawesome
  faBuilding = faBuilding;
  faPlus = faPlus;
  faPen = faPen;
  faTrashCan = faTrashCan;
  faArrowLeft = faArrowLeft;
  faUser = faUser
  



  constructor( private fb: FormBuilder, private fbF: FormBuilder, private departamentoService: DepartamentoService,private funcionarioService: FuncionarioService, private modalService: BsModalService, public nav: NavService, private http: HttpClient) { 

    this.createForm();
    this.createFormF();

  }
  
  ngOnInit() {
    this.nav.hide()
    this.loadDepartamentos()
    this.loadFuncionario()
  }

    //Função responsável por listar todos os departamentos
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

  //Função para criar o formulário do departamento
  createForm() {
    this.departamentoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sigla: ['', Validators.required]
    })
  }

// Modal do Warning de exclusao do departamento
  openModal(template: TemplateRef<any>, departamento: Departamento) {
    this.departamentoSelectedDel = departamento;
    this.modalRef = this.modalService.show(template);
  }

// Função utilizada tanto pata salvar quanto para cadastrar o funcionario
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

        console.log(departamento)
        this.loadDepartamentos()
       this.departamentoSelected = null;

      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  // Ao dar submit no formulário do departamento, chama a função departamentoSubmit(), que chama a função departamentoSave(), passando como parametro o formulario criado.
  departamentoSubmit(){
    this.departamentoSave(this.departamentoForm.value)
  }

  //Essa função é responsável por selecionar um departamento, e atribuir esse departamento a variavel departamentoSelected
  departamentoSelect(departamento: Departamento){
      this.departamentoSelected = departamento;
      this.departamentoForm.patchValue(departamento)
  }


  departamentoNew(){
    this.departamentoSelected = new Departamento();
    this.departamentoForm.patchValue(this.departamentoSelected)
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

  // Função que da unselect tanto em funcionario quanto em departamento.
  back(){
    this.funcionarioSelected = null;
    this.departamentoSelected = null;
  }


  //*********************************************************** */

//Função responsável por passar o nome do arquivo ao campo do formulario formControllName = "foto", 
  updateFotoValue(fileName: string) {
    this.funcionarioForm.get('foto').setValue(fileName);
  }

  //Função alimentada pela API que é responsavel por listar todos os funcionarios
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

//Função que cria o formulário do funcionário
  createFormF() {
    this.funcionarioForm = this.fbF.group({
      id: [''],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      foto: ['', Validators.required],
      departamentoId: [ '' , Validators.required]
    });
  }

    //Função para salvar ou cadastrar um funcionário, essa função tambem é responsável pelo upload da imagem.
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
        
        this.http.post('http://localhost:5058/api/upload', formData)
          .subscribe({
            next: (event) => {},
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

//Função que cria o caminho até a pasta que as imagens upadas estão armazenadas
  public createImgPath = (id: number, foto: string) => { 
    return `http://localhost:5058/Resources/Images/${id}${foto}`; 
  }

  uploadSingle(event) {
    const fileName = event.target.files[0].name;
  }

}
