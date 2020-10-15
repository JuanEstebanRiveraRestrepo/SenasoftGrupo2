import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ServicioService } from './../servicio.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {

  constructor(public ServicioService:ServicioService ) { }

  ngOnInit(): void {
    this.ServicioService.listarUsuarios();
  }
  llenarFormularioPaciente(usuario:Usuario){
    this.ServicioService.formularioRegistroPaciente.patchValue(usuario);
  }

  eliminarUsuario(id){
    if(confirm("¿Deseas eliminar ha este paciente?"))
      this.ServicioService.eliminarUsuario(id).subscribe(
        respuesta =>{
          this.ServicioService.listarUsuarios();
        }
      );
  }

}
