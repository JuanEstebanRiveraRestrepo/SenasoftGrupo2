import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico';
import { PacienteFamiliar } from '../models/paciente-familiar';
import { Usuarios } from '../models/usuarios';
import { Paciente } from '../models/paciente';
  

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  readonly rootURL="http://127.0.0.1:5000/";
  medico:Medico;
  pacienteFamiliar:PacienteFamiliar
  usuario:Usuarios
  paciente: Paciente

  lista:any[];
  listaPF:any[];
  listaU:any[];
  listaP:any[];


  constructor(private http:HttpClient) {

    this.http.get(this.rootURL+'medico').toPromise().then(r => this.lista = r as any[]);


   }

  tomarlista(){
    this.listar()
    return this.lista
  }

  listar(){
    this.http.get(this.rootURL+'medico').toPromise().then(r => this.lista = r as any[]);
    return this.lista
  }

  crear(){
    console.log(this.medico)
    return this.http.post(this.rootURL+'medico',this.medico);
  }


  eliminar(id){
    return this.http.delete(this.rootURL+'medico/'+id);

  }
  editar(id){

    return this.http.put(this.rootURL+'medico/'+id,
    this.medico);
    
  }


  listarPF(){
    this.http.get(this.rootURL+'pacientefam').toPromise().then(r => this.listaPF = r as any[]);
  }

  crearPF(id){
    console.log(this.medico)
    return this.http.post(this.rootURL+'pacientefam/'+id,this.pacienteFamiliar);
  }


  eliminarPF(id){
    return this.http.delete(this.rootURL+'pacientefam/'+id);

  }

  listarU(){
    this.http.get(this.rootURL+'usuario').toPromise().then(r => this.listaU = r as any[]);
  }

  crearU(){
    console.log(this.usuario)
    return this.http.post(this.rootURL+'usuario',this.usuario);
  }


  eliminarU(id){
    return this.http.delete(this.rootURL+'usuario/'+id);

  }

  listarP(){
    this.http.get(this.rootURL+'pacienteaf').toPromise().then(r => this.listaP = r as any[]);
  }

  crearP(){
    console.log(this.paciente)
    return this.http.post(this.rootURL+'pacienteaf',this.paciente);
  }


  eliminarP(id){
    return this.http.delete(this.rootURL+'pacienteaf/'+id);

  }


}
