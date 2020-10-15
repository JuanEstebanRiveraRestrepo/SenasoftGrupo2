import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import { ListarPacienteFamiliarComponent } from '../listar-paciente-familiar/listar-paciente-familiar.component';

@Component({
  selector: 'app-detalle-paciente-familiar',
  templateUrl: './detalle-paciente-familiar.component.html',
  styleUrls: ['./detalle-paciente-familiar.component.css']
})
export class DetallePacienteFamiliarComponent implements OnInit {

  constructor( public administradorService:AdministradorService) { }

  ngOnInit(): void {
  }

  tommar(){
    return ListarPacienteFamiliarComponent.detalle
  }

  meter(){

    ListarPacienteFamiliarComponent.vd = false
    
  }

}
