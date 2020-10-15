import { ServicioService } from './administrador/paciente/servicio.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AdministradorModule} from './administrador/administrador.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { FlxUiDataTable, FlxUiDatatableModule } from 'flx-ui-datatable';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdministradorModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,MatButtonModule, HttpClientModule, MatTableModule, FlxUiDatatableModule
  ],
  providers: [ServicioService, FlxUiDataTable],
  bootstrap: [AppComponent]
})
export class AppModule { }
