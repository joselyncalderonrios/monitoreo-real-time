import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BOTONES } from 'src/app/config/config';
import { Paciente } from 'src/app/models/Paciente.model';
import Swal from 'sweetalert2';
import { PacienteService } from '../paciente.service';
import { Atencion } from 'src/app/models/Atencion.model';
@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.scss']
})
export class PacienteUpdateComponent implements OnInit{

 @Input() pacienteDatos: any;
 @Input() accionmodal: any;
  public paciente:Paciente = new Paciente();
  public loadRegister = false;
  public loadDelete = false;
  public botones = BOTONES;
  public lenghtDni=8;

  public constructor
  (
    public activeModal: NgbActiveModal,
    public _pacienteService: PacienteService,
  )
  {
    this.paciente = new Paciente();
  }

  public estados: Array<any> = [
    {
      title: 'Habilitado',
      value: 1
    },
    {
      title: 'Inhabilitado',
      value: 0
    }
  ]
  ngOnInit(): void {
  this.paciente = Object.assign({}, this.pacienteDatos);
  this.paciente.bflageditarnum = false;
  console.log(this.paciente)

  const dniInput = document.getElementById('dniInput')as HTMLInputElement;
  const dniHint = document.getElementById('dniHint');

  dniInput.addEventListener('input', function() {
    const inputValue = dniInput.value.length;
    if (dniHint) {
      dniHint.innerText = `${inputValue}/8`;
    }
  });
 }
 public guardarPaciente(paciente: any, acc: number) {
  if (acc === 0) {

    console.log(this.loadDelete)
    this.paciente.accion = 'D';
    this.loadDelete = false;
  } else {
    this.loadRegister = true;
    this.paciente.accion = '';
  }

 Swal.fire({
  title: '¿Está seguro?',
  text: this.paciente.accion === 'D' ? 'Esta a punto de borrar a ' + this.paciente.id
  : this.paciente.id
  ?this.paciente.id>0
  ?'Esta a punto de actualizar a ' + this.paciente.id :
   'Esta a punto de insertar a un Nuevo Paciente'
   : 'Esta a punto de insertar a un Nuevo Paciente',
  showCancelButton: true,
  confirmButtonText: 'OK',
   }).then((result) => {

    if(result){
      //crear enviaId=true actualiza accion=0 n
      let enviaId=false;

      console.log(this.paciente);

if(this.paciente.accion === 'D'){
  this._pacienteService.eliminarPaciente(this.paciente).subscribe(resp => {
    console.log(resp)

      if (result.isConfirmed) {
        this.activeModal.close(this.paciente);
        Swal.fire(this.retornaMensaje(), '', 'success')
      //console.log('actualizado correctamente')
      }


  });
}else{
  if(!result.isDismissed){
    debugger
    this.paciente.flagmonitorear=this.pacienteDatos.flagmonitorear;
    this.paciente.flagatencion=this.pacienteDatos.flagatencion;
    this.paciente.idarduino=this.pacienteDatos.idarduino;
    this._pacienteService.guardarPaciente(this.paciente).subscribe(resp => {
      console.log(resp)
      if (resp !=null) {
        if (result.isConfirmed) {
          if(this.pacienteDatos.flagmonitorear==1&&this.pacienteDatos.id!=null){
            localStorage.setItem
            (
              'nombreMonitoreo', this.paciente.nombres + ' '+
            this.paciente.apellidoPaterno
            );
          }
          this.activeModal.close(this.paciente);
          Swal.fire(this.retornaMensaje(), '', 'success');


        }
      }

    });
  }

}






    }







    //this.router.navigateByUrl('/dashboard');
  });
 }


 retornaMensaje(): string {
  return this.paciente.accion === 'D'
  ? 'Eliminado correctamente'
    : this.paciente.id? this.paciente.id> 0
    ? 'Actualizado correctamente'
    : 'Insertado correctamente'
    :'Insertado correctamente'
}

 onCloseHandled() {
  this.activeModal.close('Cancelado');


}


}
