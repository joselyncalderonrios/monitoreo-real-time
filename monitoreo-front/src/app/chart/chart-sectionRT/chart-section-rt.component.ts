import { Component,ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { MqttService } from 'ngx-mqtt';
import { MqttClientComponent } from 'src/app/mqttClient/mqtt-client.component';
import { MonitoreoCreateComponent } from 'src/app/monitoreo/monitoreo-create/monitoreo-create.component';
import { DataSharingServiceService } from '../../data-sharing-service.service';
import { Subscription } from 'rxjs';
import { PacienteService } from 'src/app/paciente/paciente.service';
import { Paciente } from 'src/app/models/Paciente.model';

interface data {
  name: string;
  value: number;
}
@Component({
  selector: 'app-chart-section-rt',
  templateUrl: './chart-section-rt.component.html',
  styleUrls: ['./chart-section-rt.component.scss']
})
export class ChartSectionRTComponent implements OnInit,OnDestroy{
  variableRegistro!: string;
  private subscription!: Subscription;
  valorseleccionado!:any;

  multiRT: any[] = [];
  view:[number,number] = [1300,500];
  private mqttComponent: MqttClientComponent = new MqttClientComponent(this._mqttService);

  private paciente: Paciente = new Paciente();
  //options
legend: boolean = false;
ShowLabels = true;
animations: boolean = false;
xAxis: boolean = true;
yAxis: boolean = true;
showYAxisLabel: boolean = true;
showXAxisLabel: boolean = true;
xAxisLabel='Fecha';
yAxisLabel= 'SpO2';
timeline: boolean = true;
gradient = false;
//PARAMETERS
accionmodalRT:any;
colorScheme: Color = {
  domain: ['#99CCE5', '#FF7F7F'],
  group: ScaleType.Ordinal,
  selectable: true,
  name: 'Customer Usage',
};
public valorLocalStorage:any;
@ViewChild('timeline')
timelineElementRef!: ElementRef;
public lspacientesSiendoMonitoreados: Array<any> = [];

constructor(
  private route: ActivatedRoute,
  private elementRef: ElementRef,
  private _mqttService: MqttService,
  private dataSharingService: DataSharingServiceService,
  private pacienteService: PacienteService
  )
    {


    this.ngOnInit();
    this.multiRT = [
      {
        "name":"SpO2",
        "series":[]
      }
     ]

    const variabletest1 = localStorage.getItem('nombreMonitoreo');
    this.valorLocalStorage = variabletest1;
    this.valorseleccionado=variabletest1;
    //this.valorseleccionado=localStorage.getItem('idMonitoreando');
    //localStorage.setItem('nombreMonitoreo',this.valorseleccionado.value);
  }

  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.listaPacientesSiendoMonitoreados();
    console.log('gaaaaa' + this.valorseleccionado);
//this.recibirVariableRegistro('gaaa');
    this.mqttComponent.createConnection().then(e=>{
      this.mqttComponent.doSubscribe()
    .subscribe((payload:string) =>{
      const [newData] = this.ParseDatosSeries(payload);
      this.multiRT[0].series.push(newData);
        this.multiRT = [...this.multiRT];

      });
    });

  }
  onSelectionChange(event: any) {
    const valorSeleccionado = event.value;
    localStorage.setItem('nombreMonitoreo', valorSeleccionado);
    const variabletest1 = localStorage.getItem('nombreMonitoreo');
    this.valorLocalStorage = variabletest1;
  }
  ParseDatosSeries(data :string){
    let dataParse: string[] = [];
    dataParse = data.split('-');
    //value
    const randomValue = parseInt(dataParse[1], 10);
    const randomDate = dataParse[3];
    const newEntry: data = {
      name: randomDate,
      value: randomValue
    };
    return [newEntry];
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  listaPacientesSiendoMonitoreados(){
    this.paciente= new Paciente();
    this.paciente.flagmonitorear=1;
    this.pacienteService.cargaListaPacientesSiendoMonitoreados(this.paciente).subscribe((resp:any)=>{

        console.log('lista de pacientes monitoreados: '+resp)
        this.lspacientesSiendoMonitoreados=resp


    });
  }
}
