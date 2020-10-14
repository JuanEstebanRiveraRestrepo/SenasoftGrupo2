import { Component, OnInit } from '@angular/core';
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

  constructor( private formBuilder: FormBuilder, ) {}
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
  Contrasena = new FormControl('', [
    Validators.required,
  ]);
  Direccion = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  invalido() {
    if (this.Nombre.valid && this.Email.valid && this.Telefono.valid && this.CC.valid && this.Contrasena.valid)
      return true;
    else
      return false;
  }  

  onSubmit() {
  }

  ngOnInit(): void {
  }

}
