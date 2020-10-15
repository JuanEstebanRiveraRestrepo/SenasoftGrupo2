import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  AppComponent
} from './app.component';
import {
  AdministradorComponent
} from './administrador/administrador.component';
import {PacienteComponent} from './administrador/paciente/paciente.component'
import {MedicoComponent} from './administrador/medico/medico.component'
import {PacienteFamiliarComponent} from './administrador/paciente-familiar/paciente-familiar.component'

const routes: Routes = [{
    path: '',
    redirectTo: 'Admin/medico',
    pathMatch: 'full'
  },

  {
    path: '',
    component: AppComponent,
    children: [{
      path: 'Admin',
      component: AdministradorComponent,
      children: [{
          path: 'medico',
          component: MedicoComponent
        },{
          path: 'PacienteFamiliar',
          component: PacienteFamiliarComponent

        },
        {
          path: 'Paciente',
          component: PacienteComponent

        }
      ]
    }, ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
