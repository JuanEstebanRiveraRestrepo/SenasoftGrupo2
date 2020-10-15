import { Usuario } from './../usuario';
import { ServicioService } from './../servicio.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPacienteComponent implements OnInit {

  constructor(public ServicioService:ServicioService ) { }

  ngOnInit(): void {
    this.ServicioService.listarUsuarios();
  }
  llenarFormularioPaciente(usuario:Usuario){
    this.ServicioService.formularioRegistroPaciente.patchValue(usuario);
  }

}
