import { Component, OnInit } from '@angular/core';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tomar(){
    return ListarMedicoComponent.vd
  }

  




}
