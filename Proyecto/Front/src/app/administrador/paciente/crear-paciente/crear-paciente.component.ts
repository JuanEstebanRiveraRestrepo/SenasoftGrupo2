import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPacienteComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

}
