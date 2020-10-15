import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/models/usuarios';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styles: [
  ]
})
export class ListarUsuarioComponent implements OnInit, AfterViewInit {

  lista: any

  constructor(public administradorService: AdministradorService, private htttp: HttpClient) {}


  displayedColumns: string[] = ['Correo',  'Rol'];
  dataSource = new MatTableDataSource < Usuarios > ([]);
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

    this.administradorService.listarU();
    console.log(this.administradorService.listaU)

  }


  public static detalle: any
  public static vd: boolean

  tomar(ele: any) {
    ListarUsuarioComponent.vd = true
    ListarUsuarioComponent.detalle = ele
    console.log(ListarUsuarioComponent.vd)
  }

  usuarios: any

  tomarlista(lis : any){

    this.usuarios = lis
    console.log(this.usuarios)

  }

  eliminar(id){

    if(confirm("¿estas seguro de eliminar al Paquete?")){
      this.administradorService.eliminarU(id).subscribe(r => {
        this.administradorService.listarU();})}

  }

}
