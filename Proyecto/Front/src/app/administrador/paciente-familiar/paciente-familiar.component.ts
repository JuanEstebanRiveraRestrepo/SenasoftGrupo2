import { Component, OnInit } from '@angular/core';
import { ListarPacienteFamiliarComponent } from './listar-paciente-familiar/listar-paciente-familiar.component';

@Component({
  selector: 'app-paciente-familiar',
  templateUrl: './paciente-familiar.component.html',
  styleUrls: ['./paciente-familiar.component.css']
})
export class PacienteFamiliarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tomar(){
    return ListarPacienteFamiliarComponent.vd
  }

}
