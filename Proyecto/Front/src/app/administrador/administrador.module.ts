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

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from '../app-routing.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [AdministradorComponent, MedicoComponent, PacienteComponent, PacienteFamiliarComponent, CrearMedicoComponent, ListarMedicoComponent, DetalleMedicoComponent],
  imports: [
    CommonModule,MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule,MatButtonModule,
    MatTableModule,MatPaginatorModule,MatToolbarModule,MatIconModule,CdkTableModule,MatSortModule,
    DragDropModule,AppRoutingModule,MatCardModule
  ],
  exports:[
    AdministradorComponent
  ]
})
export class AdministradorModule { }
