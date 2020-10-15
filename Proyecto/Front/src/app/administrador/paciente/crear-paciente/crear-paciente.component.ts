import { Usuario } from './../usuario';
import { ServicioService } from './../servicio.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Medico } from 'src/app/models/medico';
import { Usuarios } from 'src/app/models/usuarios';
import { AdministradorService } from 'src/app/services/administrador.service';
import { Paciente } from 'src/app/models/paciente';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPacienteComponent implements OnInit {

 

  llenar(medico:Medico){

    console.log(medico.nombre)

}

constructor(private formBuilder: FormBuilder, public administradorService: AdministradorService) {}
exRegularLetras: any = "^[a-zA-ZÀ-ÿ\u00f1\u00d1 _]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 _]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 _]+$";
exRegularNumeros: any = "^[0-9]*$";

Nombre = new FormControl('', [
  Validators.required,
  Validators.pattern(this.exRegularLetras),
]);
Apellidos = new FormControl('', [
  Validators.required,
  Validators.pattern(this.exRegularLetras),
]);

Email = new FormControl('', [
  Validators.required,
  Validators.email,
]);

Telefono = new FormControl('', [
  Validators.required,
  Validators.pattern(this.exRegularNumeros),
]);
CC = new FormControl('', [
  Validators.required,
  Validators.pattern(this.exRegularNumeros),
]);
Direccion = new FormControl('', [
  Validators.required,
]);
Medico = new FormControl('', [
  Validators.required,
  Validators.pattern(this.exRegularLetras),
]);



matcher = new MyErrorStateMatcher();

invalido() {
  if (this.Nombre.valid && this.Email.valid && this.Telefono.valid && this.CC.valid)
    return true;
  else
    return false;
}

paciente: Paciente = {
  cedula: "",
  nombre: "",
  apellido: "",
  telefono: "",
  direccion: "",
  medico: "",
}

usuario: Usuarios = {
  correo : "",
  password: "",
  rol : ""

  
}

onSubmit() {

  this.paciente = {
    cedula: this.CC.value,
    nombre: this.Nombre.value,
    apellido: this.Apellidos.value,
    telefono: this.Telefono.value,
    direccion: this.Direccion.value,
    medico: this.Medico.value
  }


  this.usuario = {
    correo : this.Email.value,
    rol : "Medico",
    password: this.CC.value
  }

  console.log(this.paciente)

  this.administradorService.paciente = this.paciente
  this.administradorService.usuario = this.usuario


  this.administradorService.crearU().subscribe(r => {
    console.log(r);
  })

  this.administradorService.crearP().subscribe(r => {
    console.log(r);


    // window.location.reload();
  })




}


ngOnInit(): void {}



}
