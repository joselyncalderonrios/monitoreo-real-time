import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteDetailsComponent } from './paciente-details/paciente-details.component';
import { PacienteUpdateComponent } from './paciente-update/paciente-update.component';
import { PacienteRoutingModule } from './paciente-routing.module';
import { ChartSectionComponent } from '../chart/chart-section/chart-section.component';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MqttClientModule } from '../mqttClient/mqtt-client.module';
import { MqttClientComponent } from '../mqttClient/mqtt-client.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    PacienteCreateComponent,
    PacienteListComponent,
    PacienteDetailsComponent,
    PacienteUpdateComponent,
   // MqttClientComponent


  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FormsModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatRadioModule,
    MatSlideToggleModule,


   // MqttClientModule

  ]
})

export class PacienteModule {

 }
