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



  getAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.baseUrl}`);
  }

  getById (id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.baseUrl}/${id}`)
  }

  post(departamento: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(`${this.baseUrl}`, departamento)
  }

  put(departamento: Departamento): Observable<Departamento>{
    return this.http.put<Departamento>(`${this.baseUrl}/${departamento.id}`, departamento)
  }

  delete (id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`)
  }
}
