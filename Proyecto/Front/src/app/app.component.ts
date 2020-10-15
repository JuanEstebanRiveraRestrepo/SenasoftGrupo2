import { Component } from '@angular/core';
import { ServicioService } from './administrador/paciente/servicio.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';

  constructor(public servicioService:ServicioService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.servicioService.formularioRegistroPaciente = this.formBuilder.group({
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
    this.servicioService.guardarUsuario().subscribe(
      respuesta =>{
        this.servicioService.formularioRegistroPaciente.reset();
        console.log("Se registró el paciente");
        console.log(respuesta);
      },
      err =>{
        console.log(err)
      }
    );
  }

}


