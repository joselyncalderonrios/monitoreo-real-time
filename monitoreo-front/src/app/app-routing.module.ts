import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { EmpleadoCreateComponent } from './empleado/empleado-create/empleado-create.component';

const routes: Routes = [
  { path:'',redirectTo:'/login',pathMatch:'full' },
  { path:'login', component:AuthComponent},
  { path:'registro', component:EmpleadoCreateComponent},
  { path:'dashboard', component: PagesComponent,
children:[
  {
    path:'paciente',
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path:'empleado',
    loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule)
  }
]
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
