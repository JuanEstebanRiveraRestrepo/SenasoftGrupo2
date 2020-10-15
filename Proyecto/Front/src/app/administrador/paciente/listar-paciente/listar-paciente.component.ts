import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/models/medico';
import { AdministradorService } from 'src/app/services/administrador.service';
import { CrearMedicoComponent } from '../../medico/crear-medico/crear-medico.component';
import { ListarMedicoComponent } from '../../medico/listar-medico/listar-medico.component';
import { Usuario } from '../usuario';
import { ServicioService } from './../servicio.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {

  lista: any

  constructor(public administradorService: AdministradorService, public crearMedicoComponent:CrearMedicoComponent) {

    this.administradorService.listar();
    

    
  }
  
  displayedColumns: string[] = ['Cedula', 'Nombre', 'Apellidos', 'Email', 'Acciones'];
  dataSource = new MatTableDataSource (this.administradorService.tomarlista());
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  med = []
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  ngOnInit(): void {

    this.administradorService.listarP();
    console.log(this.administradorService.lista)

  }


  public static detalle: any
  public static vd: boolean

  tomar(ele: any) {
    ListarPacienteComponent.vd = true
    ListarPacienteComponent.detalle = ele
    console.log(ListarPacienteComponent.vd)
  }

  paciente: any

  tomarlista(lis : any){

    this.paciente = lis
    console.log(this.paciente)

  }

  eliminar(id){

    if(confirm("¿estas seguro de eliminar al Paquete?")){
      this.administradorService.eliminarP(id).subscribe(r => {
        this.administradorService.listarP();})}





  }

  llenarFormularioPaquetes(medico:Medico){

    this.crearMedicoComponent.llenar(medico);

  }



}
