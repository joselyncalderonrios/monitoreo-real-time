import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttClientComponent } from './mqtt-client.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

export const connection: IMqttServiceOptions = {
  hostname: '192.168.1.24',
  port: 9001,
  path: '',
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 4000,

  clientId: '',
  username: '',
  password: '',
  protocol: 'ws',
  connectOnCreate: false,
}

@NgModule({
  declarations: [
    MqttClientComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MqttModule.forRoot(connection)
  ],
  exports: [MqttClientComponent]
})
export class MqttClientModule { }
