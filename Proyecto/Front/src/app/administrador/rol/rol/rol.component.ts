import { RolService } from './../rol.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  constructor(public rolService:RolService) { }

  ngOnInit(): void {
  }
  probarapi(){
    this.rolService.obtenerRoles()
  }


}
