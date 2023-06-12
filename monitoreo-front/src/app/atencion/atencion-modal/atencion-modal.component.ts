import { Component,Input,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AtencionService } from 'src/app/atencion.service';
import { BOTONES, TIPOCONCEPTOS } from 'src/app/config/config';
import { EmpleadoService } from 'src/app/empleado/empleado.service';
import { Atencion } from 'src/app/models/Atencion.model';
import { AtencionDTO } from 'src/app/models/AtencionDTO.model';
import { Empleado } from 'src/app/models/Empleado.model';
import { Paciente } from 'src/app/models/Paciente.model';
import { UpdateFlagPacienteDTO } from 'src/app/models/UpdateFlagPacienteDTO.model';
import { PacienteService } from 'src/app/paciente/paciente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-atencion-modal',
  templateUrl: './atencion-modal.component.html',
  styleUrls: ['./atencion-modal.component.scss']
})

export class AtencionModalComponent  implements OnInit{
  @Input() atencionDatosDTO: any;
  @Input() pacienteDatos: any;
 @Input() accionmodal: any;
 public atencion:Atencion= new Atencion();
 public atencionDTO :AtencionDTO= new AtencionDTO();
 public empleado:Empleado= new Empleado();
 public updateFlagAtencion:UpdateFlagPacienteDTO= new UpdateFlagPacienteDTO();
 public paciente:Paciente= new Paciente();
  public loadRegister = false;
  public loadDelete = false;
  public botones = BOTONES;
  public lenghtDni=8;
  opcion:any=11;
  public tipoConceptos: Array<any> = TIPOCONCEPTOS;
  public lsTipoEnfermeras: Array<any> = [];
  public lsTipoDoctores: Array<any> = [];
  public lsPacientes: Array<any> = [];
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
  public constructor
  (
    public activeModal: NgbActiveModal,
    public _empleadoService: EmpleadoService,
    public _pacienteService: PacienteService,
    public _atencionService: AtencionService,
  )
  {
    this.atencion = new Atencion();
  }
  public ngOnInit(): void {
    this.atencionDTO = Object.assign({}, this.atencionDatosDTO);

   //this.initValores(null,null);
    //this.RetornaModificarFlag()
   // .subscribe();
    //this.paciente.bflageditarnum = false;
    console.log(this.atencion)
    this.getListaEnfermeros();
    this.getListaDoctores();
    this.getListaPacientes();
    this.initValores(11,8);

    this.opcion=11;
    const dniInput = document.getElementById('dniInput')as HTMLInputElement;
    const dniHint = document.getElementById('dniHint');
// if(dniInput.addEventListener){
// dniInput.addEventListener('input', function() {
//   const inputValue = dniInput.value.length;
//   if (dniHint) {
//     dniHint.innerText = `${inputValue}/8`;
//   }
// });
//   }

   }

   initValores(varEnf:any,varDoc:any){
    if(this.atencionDTO.idatencion==null){
      this.atencionDTO.idenfermera=varEnf;
      this.atencionDTO.iddoctor=varDoc;
      this.atencionDTO.estado=1;
    }
   }

    guardarAtencion(form: NgForm, acc: number) {

    //this.atencion.idpaciente=this.ObjatencionDTO.idpaciente;
    this.atencion= new Atencion();
    this.pacienteDatos?this.atencion.idpaciente=this.pacienteDatos.id:
    this.atencion.idpaciente=this.atencionDatosDTO.idpaciente
    this.atencion.idenfermera=parseInt(form.value.tipoenf);
    this.atencion.iddoctor=parseInt(form.value.tipodoc);
    this.atencion.estado=parseInt(form.value.estado);
    this.atencionDatosDTO?this.atencion.idatencion=this.atencionDatosDTO.idatencion:null;
    this.atencionDatosDTO?this.atencion.fechahora=this.atencionDatosDTO.fechahora:null;
    if (acc === 0) {

      console.log(this.loadDelete)
      this.atencion.accion = 'D';
      this.loadDelete = false;
    } else {
      this.loadRegister = true;
      this.atencion.accion = '';
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: this.atencion.accion === 'D' ? 'Esta a punto de borrar a ' + this.atencionDatosDTO?this.atencionDatosDTO.idatencion:''
      : this.atencionDatosDTO?this.atencionDatosDTO.idatencion>0?'Esta a punto de actualizar a ' + this.atencionDatosDTO?this.atencionDatosDTO.idatencion:'' :
       'Esta a punto de registrar una nueva atencion': 'Esta a punto de registrar una nueva atencion',
      showCancelButton: true,
      confirmButtonText: 'OK',
       }).then((result) => {

        if(result){
    if(this.atencion.accion === 'D'){
      this._atencionService.eliminarAtencion(this.atencion).subscribe(resp => {
        console.log(resp)
          if (result.isConfirmed) {
            this.activeModal.close(this.atencion);
            Swal.fire(this.retornaMensaje(), '', 'success')
          }
      });
    }else{
      if(!result.isDismissed){
         this._atencionService.guardarAtencion(this.atencion)
         .subscribe(resp => {
          console.log(resp)
          if (resp !=null) {
             this.RetornaModificarFlag();
            if (result.isConfirmed) {
               this.activeModal.close(this.atencion);
               Swal.fire(this.retornaMensaje(), '', 'success')

            }
          }

        });
      }

    }
        }
        //this.router.navigateByUrl('/dashboard');
      });
}

RetornaModificarFlag(){

  this.updateFlagAtencion = new UpdateFlagPacienteDTO();
  if(this.atencionDatosDTO) {
    if(this.atencion.estado==0){
      this.updateFlagAtencion.flagatencion=0;
    }else{
      this.updateFlagAtencion.flagatencion=1;
    }
    this.updateFlagAtencion.idpaciente=this.atencionDatosDTO.idpaciente;
  }else{
    this.updateFlagAtencion.flagatencion=1;
    this.updateFlagAtencion.idpaciente=this.pacienteDatos.id;
  }
  return this._pacienteService.modificarFlagAtencion(this.updateFlagAtencion)
  .subscribe((resp:any) => {
    console.log('flag atencion fue modificada')
  });
}

retornaMensaje(): string {
  return this.atencion.accion === 'D'
  ? 'Eliminado correctamente'
    : this.atencion.idatencion? this.atencion.idatencion> 0
    ? 'Actualizado correctamente'
    : 'Insertado correctamente'
    :'Insertado correctamente'
}

getListaEnfermeros(){
  this.empleado = new Empleado();
this.empleado.tipoEmpleado="enf";
  return this._empleadoService.cargaListaEmpleadosxTipo(this.empleado)
  .subscribe(
    (resp:any) =>{
    console.log(resp)
    this.lsTipoEnfermeras=resp
    console.log(this.lsTipoEnfermeras)
    });
}
getListaDoctores(){
  this.empleado = new Empleado();
  this.empleado.tipoEmpleado="doc";
    return this._empleadoService.cargaListaEmpleadosxTipo(this.empleado)
    .subscribe(
      (resp:any) =>{
      console.log(resp)
      this.lsTipoDoctores=resp
      console.log(this.lsTipoDoctores)
      });
}
getListaPacientes(){
  this.paciente = new Paciente();
    return this._pacienteService.cargaListaPacientes(this.paciente)
    .subscribe(
      (resp:any) =>{
      console.log(resp)
      this.lsPacientes=resp
      console.log(this.lsPacientes)
      });
}



onCloseHandled() {
  this.activeModal.close('Cancelado');
}


}
