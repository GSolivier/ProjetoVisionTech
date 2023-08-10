import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Funcionario } from '../models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

constructor(private http: HttpClient) { }

  baseUrl = `${environment.UrlPrincipal}/api/funcionario`;



  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);

  }

  getById (id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  post(funcionario: Funcionario){
    return this.http.post(`${this.baseUrl}`, funcionario)
  }

  put(id: number, funcionario: Funcionario){
    return this.http.put(`${this.baseUrl}/${id}`, funcionario)
  }

  delete (id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
