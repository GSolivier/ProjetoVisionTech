import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Funcionario } from '../models/Funcionario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

constructor(private http: HttpClient) { }

  baseUrl = `${environment.UrlPrincipal}/api/funcionario`;
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();


  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);

  }

  getById (id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  post(funcionario: Funcionario){
    return this.http.post(`${this.baseUrl}`, funcionario)
  }

  put(funcionario: Funcionario){
    return this.http.put(`${this.baseUrl}/${funcionario.id}`, funcionario)
  }

  delete (id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
