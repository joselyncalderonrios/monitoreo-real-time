import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { PacienteUpdateComponent } from './paciente-update/paciente-update.component';
import { PacienteDetailsComponent } from './paciente-details/paciente-details.component';
import { MqttClientComponent } from '../mqttClient/mqtt-client.component';
import { ChartSectionComponent } from '../chart/chart-section/chart-section.component';
import { ChartSectionRTComponent } from '../chart/chart-sectionRT/chart-section-rt.component';
import { AtencionComponent } from '../atencion/atencion.component';
import { EmpleadoEditComponent } from '../empleado/empleado-edit/empleado-edit.component';


const routes: Routes = [
  {path:'pacientes', component:PacienteListComponent},
  {path:'pacienteCreate', component:PacienteCreateComponent},
   {path:'pacienteEdit/:id', component:PacienteUpdateComponent},
    {path:'pacienteDetails/id', component:PacienteDetailsComponent},
    {path:'mqtt-client', component:MqttClientComponent},
    {path:'chart-section', component:ChartSectionComponent},
    {path:'chart-sectionRT', component:ChartSectionRTComponent},
    {path:'atencion-list', component:AtencionComponent},
    {path:'empleado_edit', component:EmpleadoEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PacienteRoutingModule { }
