import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Departamento } from '../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

constructor(private http: HttpClient) { }

  baseUrl = `${environment.UrlPrincipal}/api/departamento`;



  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);

  }

  getById (id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.baseUrl}/${id}`)
  }

  post(departamento: Departamento){
    return this.http.post(`${this.baseUrl}`, departamento)
  }

  put(id: number, departamento: Departamento){
    return this.http.put(`${this.baseUrl}/${id}`, departamento)
  }

  delete (id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
