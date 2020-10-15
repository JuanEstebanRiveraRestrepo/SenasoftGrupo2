import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from '../administrador/administrador.component';

import { MedicoComponent } from './medico/medico.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteFamiliarComponent } from './paciente-familiar/paciente-familiar.component';
import { CrearMedicoComponent } from './medico/crear-medico/crear-medico.component';
import { ListarMedicoComponent } from './medico/listar-medico/listar-medico.component';
import { DetalleMedicoComponent } from './medico/detalle-medico/detalle-medico.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CrearPacienteComponent } from './paciente/crear-paciente/crear-paciente.component';
import { RolComponent } from './rol/rol/rol.component';


@NgModule({
  declarations: [AdministradorComponent, MedicoComponent, PacienteComponent, PacienteFamiliarComponent, CrearMedicoComponent, ListarMedicoComponent, DetalleMedicoComponent, CrearPacienteComponent, RolComponent],
  imports: [
    CommonModule,MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,MatButtonModule
  ],
  exports:[
    AdministradorComponent,
    CrearPacienteComponent
  ]
})
export class AdministradorModule { }
