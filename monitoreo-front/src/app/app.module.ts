import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//inicio servicio
import { CargarScriptsService } from './cargar-scripts.service';
//fin servicio

import { PagesModule } from './pages/pages.module';
import { PacienteModule } from './paciente/paciente.module';
import { AuthModule } from './auth/auth.module';
import { ChartSectionComponent } from './chart/chart-section/chart-section.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from '@angular/forms';
//const config: SocketIoConfig = { url: 'ws://192.168.1.24:9001', options: {} };
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MqttClientComponent } from './mqttClient/mqtt-client.component';
import { MqttClientModule } from './mqttClient/mqtt-client.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ChartSectionRTComponent } from './chart/chart-sectionRT/chart-section-rt.component';
import { MqttService } from 'ngx-mqtt';
import { AtencionComponent } from './atencion/atencion.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AtencionModalComponent } from './atencion/atencion-modal/atencion-modal.component';
import { AtencionCreateComponent } from './atencion/atencion-create/atencion-create.component';

import { MonitoreoCreateComponent } from './monitoreo/monitoreo-create/monitoreo-create.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [
    AppComponent,
    ChartSectionComponent,
ChartSectionRTComponent,
AtencionComponent,
AtencionModalComponent,
AtencionCreateComponent,
MonitoreoCreateComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    PagesModule,
    PacienteModule,
    AuthModule,
    NgxChartsModule,
    MqttClientModule,
   //,SocketIoModule.forRoot(config),
   RouterModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    BsDatepickerModule.forRoot(),
    MatFormFieldModule,
      MatDatepickerModule,
      FormsModule,
      ReactiveFormsModule,
      NgIf,
      JsonPipe,
      MatNativeDateModule,
      MatPaginatorModule,
      MatRadioModule
  ],
  providers: [
    CargarScriptsService,
    MqttService,
    MqttClientComponent,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
