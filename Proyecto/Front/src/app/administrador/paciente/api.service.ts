import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { API_URL } from './conectar';
import { crearPaciente } from '../paciente/crear-paciente';
import { estadisticas } from '../paciente/estadisticas';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'aplicacion/json'})
};
const apiUrl = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operacion = 'operacion', result?: T){
    return (error: any): Observable<T> =>{
      // TODO: envía el error a la infraestructura de registro remoto
      console.error(error); // iniciar sesión en la consola en su lugar

      // la aplicación sigue ejecutándose devolviendo un resultado vacío.
      return of(result as T);
    };
  }

  getPacientes(): Observable<crearPaciente[]>{
    return this.http.get<crearPaciente[]>('${apiUrl}')
      .pipe(
        tap(pacientes => console.log('pacientes traidos')),
        catchError(this.handleError('getPacientes', []))
      );
  }

  getPacientesId(id: string): Observable<crearPaciente>{
    const url = '${apiUrl}/${id}';
    return this.http.get<crearPaciente>(url).pipe(
      tap(_ => console.log('pacientes traidos id=${id}')),
      catchError(this.handleError<crearPaciente>('getPacientesId id=${id}'))
    );
  }

  addPacientes(crearpaciente: crearPaciente): Observable<crearPaciente>{
    return this.http.post<crearPaciente>(apiUrl, crearpaciente, httpOptions).pipe(
      tap((c: crearPaciente) => console.log('agregar pacientes w/ id=${c._id}')),
      catchError(this.handleError<crearPaciente>('addPacientes'))
    );
  }

  actualizarPacientes(id: string, crearpaciente: crearPaciente): Observable<any>{
    const url = '${apiUrl}/${id}';
    return this.http.put(url, crearpaciente, httpOptions).pipe(
      tap(_ => console.log('actualizar pacientes id=${id}')),
      catchError(this.handleError<any>('actualizrPacientes'))
    );
  }

  eliminarPacientes(id: string): Observable<crearPaciente>{
    const url = '${apiUrl}/${id}';
    return this.http.delete<crearPaciente>(url, httpOptions).pipe(
      tap(_ => console.log('pacientes eliminados id=${id}')),
      catchError(this.handleError<crearPaciente>('eliminarPacientes'))
    );
  }

  getEstadisticas(estado: string): Observable<estadisticas>{
    const url = '${apiUrl}/diario/${estado}';
    return this.http.get<estadisticas>(url).pipe(
      tap(_ => console.log('estadistica traida estado=${estado}')),
      catchError(this.handleError<estadisticas>('getEstadisticas estado=${estado}'))
    );
  }
}

