import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { lsColumnaTipoEmpleado } from 'src/app/config/config';
import { Empleado } from 'src/app/models/Empleado.model';
import { EmpleadoService } from '../empleado.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styleUrls: ['./empleado-create.component.scss']
})
export class EmpleadoCreateComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  //matcher = new MyErrorStateMatcher();
  idTipoEmpleado : number = 1;
  public lsColumnaCargoEmpleado: Array<any> = lsColumnaTipoEmpleado;
  public empleado:Empleado= new Empleado();
  constructor(
    private fb:FormBuilder,
    private _empleadoService:EmpleadoService,
    private router:Router
    )

    {  }
  ngOnInit(): void {

  }
  registerForm = this.fb.group({
    firstName:['', [Validators.required]],
    lastNamePat:['', [Validators.required]],
    lastNameMat:['', [Validators.required]],
    dni:['', [Validators.required]],
    tipo:['', [Validators.required]],
    usuario:['', [Validators.required]],
    password:['', [Validators.required]]
  })


  onSubmit() {
    //console.log('form data is ',this.fb.control,this.registerForm.valid, this.registerForm.value.password, this.empleado.pass);
   // console.log('gaaaaa')
    if(
      this.empleado.user && this.empleado.pass && this.empleado.nombres&&
      this.empleado.dni?.length==8 && this.empleado.apellidoPaterno && this.empleado.apellidoMaterno
      )
      {
        console.log(' registra')
        if(this.idTipoEmpleado==1){
            this.empleado.tipoEmpleado='doc'
        }else{
            this.empleado.tipoEmpleado='enf'
        }
        
        this._empleadoService.guardarEmpleado(this.empleado)
        .subscribe((resp:any)=>{
              console.log(resp);
              Swal.fire({
                title: 'Registrado Correctamente',
                text: 'Registrado Correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                this.router.navigateByUrl('/dashboard/paciente/chart-sectionRT');
              });
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
      console.log('no registra')
    }
  }

  back(){
    this.router.navigateByUrl('/login');
  }
}
