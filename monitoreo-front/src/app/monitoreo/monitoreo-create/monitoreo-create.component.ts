import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MqttService } from 'ngx-mqtt';
import { BOTONES, BOTONESMonitorear } from 'src/app/config/config';
import { Arduino } from 'src/app/models/Arduino.model';
import { PacienteArduino } from 'src/app/models/PacienteArduino.model';
import { UpdateFlagPacienteDTO } from 'src/app/models/UpdateFlagPacienteDTO.model';
import { MonitoreoService } from 'src/app/monitoreo.service';
import { MqttClientComponent } from 'src/app/mqttClient/mqtt-client.component';
import { PacienteService } from 'src/app/paciente/paciente.service';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-monitoreo-create',
  templateUrl: './monitoreo-create.component.html',
  styleUrls: ['./monitoreo-create.component.scss']
})
export class MonitoreoCreateComponent implements OnInit{
  //variableRegistro!: string;
  @Input() pacienteDatos: any;
  public lsArduinos: Array<any> = [];
  public pacienteArduino: PacienteArduino= new PacienteArduino();
  public arduino: Arduino = new Arduino();
  public loadRegister = false;
  public loadDelete = false;
  public botones = BOTONESMonitorear;
  public updateFlagPaciente:UpdateFlagPacienteDTO= new UpdateFlagPacienteDTO();
  public idarduinoToPublish!:string
  idarduino : number = 1;
  private mqttComponent: MqttClientComponent = new MqttClientComponent(this._mqttService);

  public constructor
  (
   public activeModal: NgbActiveModal,
    //public _empleadoService: EmpleadoService,
    public _pacienteService: PacienteService,
    public _monitoreoService: MonitoreoService,
    private _mqttService: MqttService
    ) { }

  ngOnInit(){
    this.getListaArduino();
  }

  Opciones(opc:any) {
    console.log(opc)
  }
  public guardarMonitoreo(form: NgForm, acc: number) {

    this.pacienteArduino= new PacienteArduino();
    this.pacienteDatos?this.pacienteArduino.idpaciente=this.pacienteDatos.id:'';
    this.pacienteArduino.idarduino=this.idarduino;
    Swal.fire({
      title: '¿Está seguro?',
      text: this.pacienteArduino.accion === 'D' ? 'Esta a punto de borrar a ' + this.pacienteArduino.idpacientearduino :
      this.pacienteArduino.idpacientearduino > 0 ? 'Esta a punto de actualizar a ' + this.pacienteArduino.idpacientearduino :
       'Esta a punto de Monitorear a ' +  this.pacienteDatos.nombres,
      showCancelButton: true,
      confirmButtonText: 'OK',
       }).then((result)=>{
        if(!result.isDismissed){
          this._monitoreoService.guardarMonitoreo(this.pacienteArduino).subscribe(resp => {
            console.log(resp)
            if (resp !=null) {
              this.ModificarFlagMonitoreo();
              this.ModificarFlagDispArduino();
              if (result.isConfirmed) {
                this.activeModal.close(this.pacienteArduino);
                Swal.fire(this.retornaMensaje(), '', 'success')
                .then(()=>{
                      //publicar el monitoreo del paciente
                      this.mqttComponent.createConnection().then(e=>{
                        this.mqttComponent.doPublish(this.pacienteArduino.idpaciente,
                          this.pacienteArduino.idarduino)
                          .subscribe((payload:string)=>{
                            localStorage.setItem('nombreMonitoreo', this.pacienteDatos.nombres + ' '+ this.pacienteDatos.apellidoPaterno);
                            localStorage.setItem('idMonitoreando', this.pacienteDatos.nombres + ' '+ this.pacienteDatos.apellidoPaterno);
                          });
                      });
                });

              }
            }

          });
        }

       });
  }
  getListaArduino(){
    this.arduino = new Arduino();
    this.arduino.flagdisponible = 0;
    return this._monitoreoService.cargaListaArduinosPorDisponibilidad(this.arduino)
    .subscribe(
      (resp:any) =>{
      this.lsArduinos=resp
      console.log(this.lsArduinos)
      });
  }
  onCloseHandled() {
    this.activeModal.close('Cancelado');
  }

  ModificarFlagMonitoreo(){
    this.updateFlagPaciente = new UpdateFlagPacienteDTO();
    this.updateFlagPaciente.flagmonitorear=1;
    this.updateFlagPaciente.idpaciente=this.pacienteDatos.id;
    this.updateFlagPaciente.idArduino=this.idarduino;
    return this._pacienteService.modificarFlagMonitoreo(this.updateFlagPaciente)
    .subscribe((resp:any) => {
  console.log('exito')
    });
  }


  ModificarFlagDispArduino(){
    this.updateFlagPaciente = new UpdateFlagPacienteDTO();
    this.updateFlagPaciente.idArduino=this.idarduino;
    this.updateFlagPaciente.flagdisponible=1;
    return this._pacienteService.modificarFlagDisponibilidadArduino(this.updateFlagPaciente)
    .subscribe((resp:any) => {
  console.log('exito')
    });
  }
  // retornaModificarFlagMonitoreo$(Objflagatencion:UpdateFlagPacienteDTO){

  // }
  retornaMensaje(): string {
    return this.pacienteArduino.accion === 'D'
    ? 'Eliminado correctamente'
      : this.pacienteArduino.idpacientearduino? this.pacienteArduino.idpacientearduino> 0
      ? 'Actualizado correctamente'
      : 'Insertado correctamente'
      :'Insertado correctamente'
  }
}
