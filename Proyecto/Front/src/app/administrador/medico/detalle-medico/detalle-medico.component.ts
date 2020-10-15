import { Component, OnInit } from '@angular/core';
import {Medico} from '../../../models/medico'
import {AdministradorService} from '../../../services/administrador.service'
import { ListarMedicoComponent } from '../listar-medico/listar-medico.component';


@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.component.html',
  styleUrls: ['./detalle-medico.component.css']
})

export class DetalleMedicoComponent implements OnInit {

  constructor(public administradorService:AdministradorService) { }

  ngOnInit(): void {
  }

  tommar(){
    return ListarMedicoComponent.detalle
  }

  meter(){

    ListarMedicoComponent.vd = false
    
  }


  




}
