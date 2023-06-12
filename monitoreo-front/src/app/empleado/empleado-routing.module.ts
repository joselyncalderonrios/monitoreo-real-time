import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoCreateComponent } from './empleado-create/empleado-create.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoDetailsComponent } from './empleado-details/empleado-details.component';


const routes: Routes = [

  {path:'empleados', component:EmpleadoListComponent},
  {path:'pacienteCreate', component:EmpleadoCreateComponent},
  {path:'pacienteEdit/:id', component:EmpleadoEditComponent},
   {path:'pacienteDetails/id', component:EmpleadoDetailsComponent},
];


@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(routes),
    CommonModule
  ],

  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
