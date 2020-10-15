import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico';
  

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  readonly rootURL="http://127.0.0.1:5000/";
  medico:Medico;

  lista:any[];

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


}
