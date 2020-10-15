import { environment } from './../../../environments/environment';
import { Usuario } from './usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  readonly rootURL= "http://127.0.0.1:5000";
  usuario:Usuario;
  formularioRegistroPaciente: FormGroup;
  listaUsuarios:Usuario[];

  seleccionarUsuario: Usuario = {
    cedula : '',
    nombre : '',
    apellido : '',
    telefono : '',
    medico : '',
    direccion : '',
  };

  constructor(private http: HttpClient) { }

  guardarUsuario(){
    this.usuario = this.formularioRegistroPaciente.value;
    console.log(this.usuario)
     return this.http.post(this.rootURL + '/pacienteaf', this.usuario);
  }

  listarUsuarios(){
    this.http.get(this.rootURL + '/pacienteaf')
    .toPromise()
    .then(respuesta => this.listaUsuarios = respuesta as Usuario[])
  }

  env = environment
  // postUsuario(){
  //       return this.http.get(this.env.apiUrl + '/rol').subscribe(e => console.log(e))
  // }
}
