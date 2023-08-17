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


  getAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}`);
  }

  getById (id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  post(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(`${this.baseUrl}`, funcionario)
  }

  put(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(`${this.baseUrl}/${funcionario.id}`, funcionario)
  }

  delete (id: number): Observable<Funcionario> {
    return this.http.delete<Funcionario>(`${this.baseUrl}/${id}`)
  }

}
