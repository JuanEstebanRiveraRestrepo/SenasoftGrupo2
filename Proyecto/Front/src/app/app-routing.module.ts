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
import {DetalleMedicoComponent} from './administrador/medico/detalle-medico/detalle-medico.component'
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
