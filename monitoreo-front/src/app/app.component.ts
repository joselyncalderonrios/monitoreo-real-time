import { Component } from '@angular/core';
//import {Paho} from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // client:any;
  // message:any;

  // title = 'monitoreo';

  constructor(
    ) {}

  //   this.client = new Paho.MQTT.Client('192.168.1.24', 9001, 'qwerty12345');

  //   // Create a client instance
  //   // this.client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

  //   // set callback handlers
  //   this.client.onConnectionLost = this.onConnectionLost;
  //   this.client.onMessageArrived = this.onMessageArrived;

  //   // connect the client
  //   this.client.connect({ onSuccess: this.onConnect });
  // }
  // // called when the client connects
  // onConnect() {
  //   // Once a connection has been made, make a subscription and send a message.
  //   console.log('onConnect');
  //   this.client.subscribe('RigCLOUDEdge/RIG_ID/WELL_CHANGE');
  //   this.message = new Paho.MQTT.Message('RigCLOUDEdge/RIG_ID/WELL_CHANGE');
  //   this.message.destinationName = 'RigCLOUDEdge/RIG_ID/WELL_CHANGE';
  //   this.client.send(this.message);
  // }

  // // called when the client loses its connection
  // onConnectionLost(responseObject:any) {
  //   if (responseObject.errorCode !== 0) {
  //     console.log('onConnectionLost:' + responseObject.errorMessage);
  //   }
  // }

  // // called when a message arrives
  // onMessageArrived(message: any) {
  //   console.log('onMessageArrived:' + message.payloadString);
  // }

}


