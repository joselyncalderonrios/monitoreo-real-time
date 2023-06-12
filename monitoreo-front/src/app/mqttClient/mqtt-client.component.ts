import { Component } from '@angular/core';
import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
  IPublishOptions,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-mqtt-client',
  templateUrl: './mqtt-client.component.html',
  styleUrls: ['./mqtt-client.component.scss'],
})
export class MqttClientComponent {

  constructor
  (
    private _mqttService: MqttService
  )
  {
    this.client = this._mqttService;

  }
    ngOnInit():any{}

    private curSubscription: Subscription | undefined;
    connection = {
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
      }
    subscription = {
      topic: 'testTopico',
      qos: 0,
    };
    publish = {
      topic: 'testEnviarArdPac',
      qos: 0,
      payload: '{ "msg": "idpaciente-idarduino" }',
    };
    receiveNews = '';
    qosList = [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ];
    client: MqttService | undefined;
    isConnection = false;
    subscribeSuccess = false;
    payloadArray: string = '';

    public createConnection() {
      return new Promise<string>((resolve, reject) => {
        try {
          this.client?.connect(this.connection as IMqttServiceOptions)
        } catch (error) {
          console.log('mqtt.connect error', error);
        }
        this.client?.onConnect.subscribe(() => {
          this.isConnection = true
          console.log('Connection succeeded!');
        });
        this.client?.onError.subscribe((error: any) => {
          this.isConnection = false
          console.log('Connection failed', error);
        });
        this.client?.onMessage.subscribe((packet: any) => {
          this.receiveNews = this.receiveNews.concat(packet.payload.toString())
          console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`)
        });
        // Ejemplo: Simular una operación asíncrona que se resuelve después de 2 segundos
        setTimeout(() => {
          const result = 'Operación completada';
          resolve(result); // Resuelve la promesa con el resultado
        }, 2000);
      });

    }

    // 订阅主题
    public  doSubscribe(): Observable<string> {

      console.log('entre a doSubscribe');
       const { topic, qos } = this.subscription
       return new Observable<string>((observe) => {
      this.curSubscription = this.client?.observe('testTopico', { qos } as IClientSubscribeOptions)
      .subscribe((message: IMqttMessage) => {
        console.log('subscrito');
        this.subscribeSuccess = true
        this.payloadArray = message.payload.toString();
        observe.next(this.payloadArray);
        console.log('Subscribe to topics res', message.payload.toString())
      });
      //console.log(payloadArray + 'doSubscribe')
    });
    }
//  public doSubscribe() {
//   const { topic, qos } = this.subscription
//   this.curSubscription = this.client?.observe('testTopico', { qos } as IClientSubscribeOptions).subscribe((message: IMqttMessage) => {
//     this.subscribeSuccess = true
//     console.log('Subscribe to topics res', message.payload.toString())
//   })
// }

    // 取消订阅
    doUnSubscribe() {
      this.curSubscription?.unsubscribe()
      this.subscribeSuccess = false
    }
    // 发送消息
    public doPublish(idPaciente:any, idArduino:any): Observable<string>  {
      //const { topic, qos, payload } = this.publish
      const topic = this.publish.topic;
      const qos = this.publish.qos;
      const payload = `${idPaciente}-${idArduino}`;
      console.log('payloadtopublicar : ' + payload)
       return new Observable<string>((observe) => {
      this.client?.unsafePublish(topic, payload, { qos } as IPublishOptions)
          this.payloadArray = payload.toString();
          observe.next(this.payloadArray);
       });
    }

    // 断开连接
    destroyConnection() {
      try {
        this.client?.disconnect(true)
        this.isConnection = false
        console.log('Successfully disconnected!')
      } catch (error: any) {
        console.log('Disconnect failed', error.toString())
      }
    }
}

