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

  Medicos = true;
  Paciente = false;
  Familiar = false;
  Administrador = false;


  mc() {
    this.Medicos = true;
    this.Paciente = false;
    this.Familiar = false;
    this.Administrador = false;
    
  }
  ms() {
    this.Medicos = false;
    this.Paciente = true;
    this.Familiar = false;
    this.Administrador = false;
  }
  mco() {
    this.Medicos = false;
    this.Paciente = false;
    this.Familiar = true;
    this.Administrador = false;
  }
  mi() {
    this.Medicos = false;
    this.Paciente = false;
    this.Familiar = false;
    this.Administrador = true;
  }

  menu= true

}
