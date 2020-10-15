import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteFamiliar } from 'src/app/models/paciente-familiar';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-listar-paciente-familiar',
  templateUrl: './listar-paciente-familiar.component.html',
  styleUrls: ['./listar-paciente-familiar.component.css']
})
export class ListarPacienteFamiliarComponent implements OnInit , AfterViewInit{

  lista: any
  constructor(public administradorService: AdministradorService, private htttp: HttpClient) { }

  displayedColumns: string[] = ['Cedula', 'Nombre', 'Apellidos', 'Email', 'Acciones'];
  dataSource = new MatTableDataSource < PacienteFamiliar > ([]);
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

    this.administradorService.listarPF();
    console.log(this.administradorService.listaPF)

  }


  public static detalle: any
  public static vd: boolean

  tomar(ele: any) {
    ListarPacienteFamiliarComponent.vd = true
    ListarPacienteFamiliarComponent.detalle = ele
    console.log(ListarPacienteFamiliarComponent.vd)
  }

  pacientesfamiliar: any

  tomarlista(lis : any){

    this.pacientesfamiliar = lis
    console.log(this.pacientesfamiliar)

  }

  eliminar(id){

    if(confirm("¿estas seguro de eliminar al Paquete?")){
      this.administradorService.eliminarPF(id).subscribe(r => {
        this.administradorService.listarPF();})}





  }

}
