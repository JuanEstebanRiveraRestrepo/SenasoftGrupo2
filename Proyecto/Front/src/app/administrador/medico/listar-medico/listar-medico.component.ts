import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Medico} from '../../../models/medico'
import {AdministradorService} from '../../../services/administrador.service'
const ELEMENT_DATA: Medico[] = [
  {id: 1, Nombre: 'Felipa', Apellidos: 'Cadavid Gómez', Telefono: '7133143', Email: 'Felipa@gmail.com', Cedula:'1003456273',Direccion: 'Calle 111G # 64 - 91 301',Cargo: 'General',Especialidad: 'General', Usuario: 1},
  {id: 2, Nombre: 'Arturo Gonzalo', Apellidos: 'Quiroz Alzate', Telefono: '684934', Email: 'Artu@gmail.com', Cedula:'4563456273',Direccion: 'Calle 121 # 15 - 34 ',Cargo: 'Especialista',Especialidad: 'Cardiologo', Usuario: 1},
  {id: 3, Nombre: 'Theryon', Apellidos: 'Bohorquez Martinez', Telefono: '7588843', Email: 'yon@gmail.com', Cedula:'154656273',Direccion: 'Carrera 64A 111G - 23',Cargo: 'Especialista',Especialidad: 'Dermatologo', Usuario: 1},

];

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.css']
})
export class ListarMedicoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Cedula','Nombre', 'Apellidos', 'Email', 'Acciones'];
  dataSource = new MatTableDataSource<Medico>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public administradorService : AdministradorService) { }

  ngOnInit(): void {
  }


  public static detalle : any
  public static vd : boolean 

  tomar(ele : any){
    ListarMedicoComponent.vd = true
    ListarMedicoComponent.detalle = ele
    console.log(ListarMedicoComponent.vd)
  }







}
