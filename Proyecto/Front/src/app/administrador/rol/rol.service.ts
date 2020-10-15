import {Rol} from './rol'
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rol:Rol;

  constructor(private http:HttpClient) { }
  env = environment

  obtenerRoles(){
    return this.http.get(this.env.apiUrl + '/rol')
    .subscribe(e => console.log(e))
  }
}
