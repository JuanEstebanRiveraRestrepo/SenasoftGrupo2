import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PacienteFamiliar } from 'src/app/models/paciente-familiar';
import { AdministradorService } from 'src/app/services/administrador.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crear-paciente-familiar',
  templateUrl: './crear-paciente-familiar.component.html',
  styleUrls: ['./crear-paciente-familiar.component.css']
})
export class CrearPacienteFamiliarComponent implements OnInit {

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
  Titular = new FormControl('', [
    Validators.required,
  ]);



  matcher = new MyErrorStateMatcher();

  invalido() {
    if (this.Nombre.valid && this.Email.valid && this.Telefono.valid && this.CC.valid)
      return true;
    else
      return false;
  }

  pacienteFamiliar: PacienteFamiliar = {
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    titular: ""
  }

  onSubmit() {

    this.pacienteFamiliar = {
      cedula: this.CC.value,
      nombre: this.Nombre.value,
      apellido: this.Apellidos.value,
      telefono: this.Telefono.value,
      direccion: this.Direccion.value,
      titular: this.Titular.value
    }

    console.log(this.pacienteFamiliar)

    this.administradorService.pacienteFamiliar = this.pacienteFamiliar

    this.administradorService.crearPF(this.Titular.value).subscribe(r => {
      console.log(r);


      window.location.reload();
    })




  }


  ngOnInit(): void {}

}
