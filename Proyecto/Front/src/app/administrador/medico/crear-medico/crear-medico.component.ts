import {
  Component,
  OnInit
} from '@angular/core';
import {
  AdministradorService
} from '../../../services/administrador.service'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  Medico
} from 'src/app/models/medico';

import{ Usuarios }from 'src/app/models/usuarios'



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent implements OnInit {




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
  Cargo = new FormControl('', [
    Validators.required,
    Validators.pattern(this.exRegularLetras),
  ]);

  Especialidad = new FormControl('', [
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

  medico: Medico = {
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    cargo: "",
    especialidad: "",
    usuario: ""
  }

  usuario: Usuarios = {
    correo : "",
    password: "",
    rol : ""

    
  }

  onSubmit() {

    this.medico = {
      cedula: this.CC.value,
      nombre: this.Nombre.value,
      apellido: this.Apellidos.value,
      telefono: this.Telefono.value,
      direccion: this.Direccion.value,
      cargo: this.Cargo.value,
      especialidad: this.Especialidad.value,
      usuario: this.Email.value
    }


    this.usuario = {
      correo : this.Email.value,
      rol : "Medico",
      password: this.CC.value
    }

    console.log(this.medico)

    this.administradorService.medico = this.medico
    this.administradorService.usuario = this.usuario


    this.administradorService.crearU().subscribe(r => {
      console.log(r);
    })

    this.administradorService.crear().subscribe(r => {
      console.log(r);


      // window.location.reload();
    })




  }


  ngOnInit(): void {}
}
