import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Color, MultiSeries, ScaleType } from '@swimlane/ngx-charts';
import { ActivatedRoute } from '@angular/router';
import { Metrica } from 'src/app/models/Metrica.model';
import * as moment from 'moment';

import { Subscription  } from 'rxjs';
import { MqttService } from 'ngx-mqtt';
import { MqttClientComponent } from 'src/app/mqttClient/mqtt-client.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import {FormGroup,FormBuilder , FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ChartService } from '../chart.service';
import { FechaRange } from 'src/app/models/FenchaRange.model';

interface data {
  name: string;
  value: number;
}
@Component({
  selector: 'app-chart-section',
  templateUrl: './chart-section.component.html',
  styleUrls: ['./chart-section.component.scss'],

})
export class ChartSectionComponent implements OnInit,OnDestroy{
 arrayStringUtil:any;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  enviarData = new FechaRange();
  rangeSelected!: FormGroup;
  public datePickerConfig!: Partial<BsDatepickerConfig>;
  public selectedDate!: Date;
  private mqttComponent: MqttClientComponent = new MqttClientComponent(this._mqttService);

  multi: any[];
 //multiRT: any[] = [];
  view:[number,number] = [1300,500];
  valorEmitido!: number;
  fechaAleatoria!: Date;
  //data: MultiSeries[] = [];
  data: any[] = [];
  dataMaxMinGrafica: any[] = [];
  public datosMetrica:Metrica[] = [];
  private subscription!: Subscription;
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

//parametros
  paramValue:any;
  accionmodalRT:any;
  array: any;

  colorScheme: Color = {
    domain: ['#99CCE5', '#FF7F7F'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
};
  @ViewChild('timeline')
  timelineElementRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private _mqttService: MqttService,
    private _chartService : ChartService,
    private formBuilder: FormBuilder,
    )
    {
      this.datePickerConfig = {
        dateInputFormat: 'YYYY-MM-DD',
        containerClass: 'theme-default',
        showWeekNumbers: false
      };
      //this.paramValue=undefined;
    // Object.assign(this, { multi });
    this.ngOnInit();
    //this.datosMetrica =this.array.lsmetricas;
//  this.multiRT = [
//   {
//     "name":"SpO2",
//     "series":[]

//   }
//  ]
this.multi=[
  {
    "name":"Max-SpO2",
    "series":[]
  },
  {
    "name":"Min-SpO2",
    "series":[]
  }
];
//interval(3000).subscribe(() => {
  //const [newData] = this.ParseDatosSeries(this.mqttComponent.doSubscribe());
  // this.multi[0].series.push(newData);
  // if (this.multi[0].series.length >= 20) {
  //   this.multi = [...this.multi];
  //   this.multi[0].series = []
  //   // Realizar la actualización de la gráfica con los registros acumulados
  // }
//});
//sirve
// if(this.array){
// this.array.lsmetricas.forEach((e:any) => {
//   this.multi[0].series.push({

//     name: moment(e.fechahora, 'YYYY-MM-DD HH:mm:ss.SSSZ').toDate(),
//     value: e.valor
//   });
//   console.log(moment(e.fechahora, 'YYYY-MM-DD HH:mm:ss.SSSZ').toDate());
// });
// }


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
   // this.paramValue=undefined;
//MQTT EN REAL-TIME
//interval(3000).subscribe(() => {
//if(this.accionmodalRT==0){
  // this.mqttComponent.createConnection().then(e=>{
  //   this.mqttComponent.doSubscribe()
  // .subscribe((payload:string) =>{
  //   const [newData] = this.ParseDatosSeries(payload);
  //   this.multiRT[0].series.push(newData);
  //     this.multiRT = [...this.multiRT];

  //   });
  // });
//}
//});
    //MQTT EN REAL-TIME
    this.SubscritoQueryParameters();
//console.log(this.paramValue);
        // if(this.array){
        //   this.array.lsmetricas
        //   .map((dc:any) => {
        // if(!dc.fechahora){return}
        // var dateFormat= new Date(dc.fechahora);
        // dc.fechahora_format = dateFormat.getDate()+
        //   "/"+(dateFormat.getMonth()+1)+
        //   "/"+dateFormat.getFullYear()+
        //   " "+dateFormat.getHours()+
        //   ":"+dateFormat.getMinutes()+
        //   ":"+dateFormat.getSeconds();
        // });
        // }
}
ParseDatosSeries(data :string){
  let dataParse: string[] = [];
  dataParse = data.split('-');
  //value
  const randomValue = parseInt(dataParse[1], 10);
  //const randomDate =  moment(dataParse[2], 'x').toDate();
  const randomDate = dataParse[2];
  const newEntry: data = {
    name: randomDate,
    value: randomValue
  };
  return [newEntry];
}
buscar()
{
const starta = this.range.get('start')?.value
 const enda =this.range.get('end')?.value
this.enviarData.start= starta?.getTime();
this.enviarData.end= enda?.getTime();
//this.SubscritoQueryParameters();
const idpacienteLS = localStorage.getItem('idpaciente');

if(idpacienteLS){
  this.enviarData.idpaciente=parseInt(idpacienteLS);
}

  this._chartService.getQueryPromedioPorDiaRangoFechasDTO(this.enviarData)
  .subscribe((resp:any) => {
    console.log(resp);
this.dataMaxMinGrafica=resp;
    this.dataMaxMinGrafica.forEach((e:any) => {
        this.multi[0].series.push({
          name: moment(e.hora, 'YYYY-MM-DD HH:mm:ss.SSSZ').toDate(),
          value: e.maximo
        });
        this.multi[1].series.push({
          name: moment(e.hora, 'YYYY-MM-DD HH:mm:ss.SSSZ').toDate(),
          value: e.minimo
        });
        this.multi = [...this.multi];
  });
});
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
SubscritoQueryParameters(){
  this.route.queryParams.subscribe(params => {
    this.paramValue = params['parametro'];
    const arrayString = params['array'];
    if (this.paramValue && arrayString) {
      this.array = JSON.parse(decodeURIComponent(arrayString));
      localStorage.setItem('idpaciente',this.array.id);
      localStorage.setItem('accionmodal',this.paramValue);
    } else {
      // Manejar el caso cuando los valores son nulos o no están presentes
    }
  });
}

}






