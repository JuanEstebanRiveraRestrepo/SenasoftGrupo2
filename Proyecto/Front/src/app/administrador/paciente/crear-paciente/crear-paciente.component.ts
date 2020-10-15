import { Usuario } from './../usuario';
import { ServicioService } from './../servicio.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPacienteComponent implements OnInit {

  constructor(public servicioService:ServicioService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.servicioService.formularioRegistroPaciente = this.formBuilder.group({
      id: [0],
      cedula:["", [Validators.required, Validators.pattern(this.exRegularNumeros)]],
      nombre:["", [Validators.required, Validators.pattern(this.exRegularLetras)]],
      apellido:["", [Validators.required, Validators.pattern(this.exRegularLetras)]],
      telefono:["", [Validators.required, Validators.pattern(this.exRegularNumeros)]],
      correo:["", [Validators.required, Validators.pattern(this.exRegularCorreo)]],
      medico:["", [Validators.required, Validators.pattern(this.exRegularLetras)]],
      direccion:["", [Validators.required, Validators.maxLength(10)]]
    })
  }

  exRegularLetras: any = "^[a-zA-Z ]*$";
  exRegularCorreo: any = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
  exRegularNumeros: any = "^[0-9]*$";

  get id(){
    return this.servicioService.formularioRegistroPaciente.controls["id"];
  }
  get cedula(){
    return this.servicioService.formularioRegistroPaciente.controls["cedula"];
  }

  get nombre(){
    return this.servicioService.formularioRegistroPaciente.controls["nombre"];
  }

  get apellido(){
    return this.servicioService.formularioRegistroPaciente.controls["apellido"];
  }

  get telefono(){
    return this.servicioService.formularioRegistroPaciente.controls["telefono"];
  }

  get correo(){
    return this.servicioService.formularioRegistroPaciente.controls["correo"];
  }

  get medico(){
    return this.servicioService.formularioRegistroPaciente.controls["medico"];
  }

  get direccion(){
    return this.servicioService.formularioRegistroPaciente.controls["direccion"];
  }



  onSubmit(){
    this.servicioService.usuario = this.servicioService.formularioRegistroPaciente.value;

    if(this.servicioService.usuario.id == null || this.servicioService.usuario.id==null)
      this.guardarUsuario();
    else
      this.editarUsuario();
   /* */

}

guardarUsuario(){
  this.servicioService.guardarUsuario().subscribe(
    respuesta =>{
      this.servicioService.formularioRegistroPaciente.reset();
      this.servicioService.listarUsuarios();
      console.log("Se registró el paciente");
      console.log(respuesta);
    },
    err =>{
      console.log(err)
    }
  );
}


editarUsuario(){
  this.servicioService.editarUsuario().subscribe(
    respuesta =>{
      this.servicioService.formularioRegistroPaciente.reset();
      this.servicioService.listarUsuarios();
      console.log("Se editó correctamente");
      console.log(respuesta);
    },
    err =>{
      console.log(err)
    }
  );
}



}
