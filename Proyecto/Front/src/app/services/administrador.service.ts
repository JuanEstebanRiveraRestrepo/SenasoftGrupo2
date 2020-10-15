import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico';
import { PacienteFamiliar } from '../models/paciente-familiar';
  

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  readonly rootURL="http://127.0.0.1:5000/";
  medico:Medico;
  pacienteFamiliar:PacienteFamiliar

  lista:any[];
  listaPF:any[];

  constructor(private http:HttpClient) { }



  listar(){
    this.http.get(this.rootURL+'medico').toPromise().then(r => this.lista = r as any[]);
  }

  crear(){
    console.log(this.medico)
    return this.http.post(this.rootURL+'medico',this.medico);
  }


  eliminar(id){
    return this.http.delete(this.rootURL+'medico/'+id);

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


}
