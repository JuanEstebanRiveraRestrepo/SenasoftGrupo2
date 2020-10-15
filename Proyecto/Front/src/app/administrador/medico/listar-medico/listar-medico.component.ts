import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
  Medico
} from '../../../models/medico'
import {
  AdministradorService
} from '../../../services/administrador.service'
import {
  HttpClient
} from '@angular/common/http';
import { CrearMedicoComponent } from '../crear-medico/crear-medico.component';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.css']
})
export class ListarMedicoComponent implements OnInit, AfterViewInit {
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

    this.administradorService.listar();
    console.log(this.administradorService.lista)

  }


  public static detalle: any
  public static vd: boolean

  tomar(ele: any) {
    ListarMedicoComponent.vd = true
    ListarMedicoComponent.detalle = ele
    console.log(ListarMedicoComponent.vd)
  }

  medicos: any

  tomarlista(lis : any){

    this.medicos = lis
    console.log(this.medicos)

  }

  eliminar(id){

    if(confirm("¿estas seguro de eliminar al Paquete?")){
      this.administradorService.eliminar(id).subscribe(r => {
        this.administradorService.listar();})}





  }

  llenarFormularioPaquetes(medico:Medico){

    this.crearMedicoComponent.llenar(medico);

  }








}
