import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menu = true;
  contenido = true;
  salud = false;
  comunidad = false;
  informacion = false;

  mc() {
    this.contenido = true;
    this.salud = false;
    this.comunidad = false;
    this.informacion = false;
    
  }
  ms() {
    this.contenido = false;
    this.salud = true;
    this.comunidad = false;
    this.informacion = false;
  }
  mco() {
    this.contenido = false;
    this.salud = false;
    this.comunidad = true;
    this.informacion = false;
  }
  mi() {
    this.contenido = false;
    this.salud = false;
    this.comunidad = false;
    this.informacion = true;
  }

}
