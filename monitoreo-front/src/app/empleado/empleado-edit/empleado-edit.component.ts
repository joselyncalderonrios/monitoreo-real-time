import { Component,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BOTONES, lsColumnaTipoEmpleado } from 'src/app/config/config';
import { Empleado } from 'src/app/models/Empleado.model';
import { EmpleadoService } from '../empleado.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.scss']
})
export class EmpleadoEditComponent implements OnInit{


  public empleado:Empleado = new Empleado();
  public botones = BOTONES;
  public lenghtDni=8;
  public lsColumnaCargoEmpleado: Array<any> = lsColumnaTipoEmpleado;
  idTipoEmpleado : number = 1;
  hidePassword: boolean = true;
  public constructor
  (
    public activeModal: NgbActiveModal,
    public _empleadoService: EmpleadoService,
    public router:Router
  )
  {
    this.empleado = new Empleado();
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if(usuarioGuardado){
      debugger
      this.empleado = JSON.parse(usuarioGuardado);
      console.log(this.empleado.id)

    }
  }
    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }
  onSubmit(){

    if(
      this.empleado.user && this.empleado.pass && this.empleado.nombres&&
      this.empleado.dni?.length==8 && this.empleado.apellidoPaterno && this.empleado.apellidoMaterno
      )
      {
        Swal.fire({
          title: '¿Está seguro?',
          text: 'de Actualizar tu perfil de usuario',
          showCancelButton: true,
          confirmButtonText: 'OK',
           }).then((result) => {
            if(result){
              if(!result.isDismissed){
                if(this.idTipoEmpleado==1){
                  this.empleado.tipoEmpleado='doc'
              }else{
                  this.empleado.tipoEmpleado='enf'
              }

                this._empleadoService.guardarEmpleado(this.empleado)
                .subscribe((resp:any)=>{
                  localStorage.setItem('usuario', JSON.stringify(resp));
                      console.log(resp);
                      Swal.fire({
                        title: 'ACTUALIZADO CORRECTAMENTE',
                        text: 'Actualizado Correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                      }).then((result) => {
                        this.router.navigateByUrl('/dashboard/paciente/empleado_edit').then(() => {
                          window.location.reload();
                        });

                      });
                });

              }


            }

          });


    }
    else{

      Swal.fire({
        title: 'Warning',
        text: 'Verifica el Formulario, Faltan llenar datos',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.value) {
          setTimeout(() => {
            Swal.close();
          }, 1000); // Cerrar la ventana después de 3 segundos (3000 milisegundos)
        }
      });

    }
  }



}
