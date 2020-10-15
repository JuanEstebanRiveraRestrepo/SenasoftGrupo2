import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styles: [
  ]
})
export class EditarMedicoComponent implements OnInit {

  constructor(public administradorService : AdministradorService, private formBuilder: FormBuilder) {}
  formulario: FormGroup
  ngOnInit(): void {


    this.formulario = this.formBuilder.group({
      Codigo: [0],
      NumeroCasillero: [ [Validators.required]],
      Peso: ["", [Validators.required, Validators.pattern(this.exRegularNumeros)]],
      Estado: [ [Validators.required, Validators.pattern(this.exRegularNumeros)]],
      GuiaUsa: ["", [Validators.required]],
      Empresa: [ [Validators.required]],
      TipoMercancia: [ [Validators.required]],
      GuiaColombia: ["", [Validators.required]],
      Valor: ["", [Validators.required, Validators.pattern(this.exRegularNumeros)]],

    });
    }
  exRegularLetras: any = "^[a-zA-Z ]*$";
  exRegularCorreo: any = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
  exRegularNumeros: any = "^[0-9]*$";

  get NumeroCasillero() {
    return this.formulario.controls["NumeroCasillero"];
  }
  get Peso() {
    return this.formulario.controls["Peso"];
  }
  get Estado() {
    return this.formulario.controls["Estado"];
  }
  get GuiaUsa() {
    return this.formulario.controls["GuiaUsa"];
  }
  get Empresa() {
    return this.formulario.controls["Empresa"];
  }
  get TipoMercancia() {
    return this.formulario.controls["TipoMercancia"];
  } 
  get GuiaColombia() {
    return this.formulario.controls["GuiaColombia"];
  } 
  get Valor() {
    return this.formulario.controls["Valor"];
  }
  medico: any
  onSubmit() {
    this.medico = this.formulario.value
    this.administradorService.editar(this.medico._id.$oid).subscribe(r => {
      this.administradorService.listar();
    })

  }

}
