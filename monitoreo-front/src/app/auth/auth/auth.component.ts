import { Component , OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit{

  usuario!: string;
  password!: string;
  token: String = '';
  public empleado:Empleado = new Empleado();

  constructor
  (
    private router: Router,
    private _authService:AuthService
  )
    {

    }
  ngOnInit(): void {
    this.empleado!=this._authService.empleado;
    let usersto: any = {};
    usersto = JSON.parse(localStorage.getItem('empleado') || '{}');

  }


  ingresar(){

   // let emp = new Empleado('','','','','',forma.value.usuario,forma.value.password);
    //let emp = new Empleado('','','','','',forma.value.usuario,forma.value.password);

    this.empleado=new Empleado();
// this.empleado.user=forma.value.usuario;
// this.empleado.pass=forma.value.password;
this.empleado.user=this.usuario;
this.empleado.pass=this.password;
    var empjson2=JSON.stringify(this.empleado);
    console.log(empjson2);
    
if(this.usuario && this.password){
    this._authService.loginAuth(this.empleado)
    .subscribe(resp => {
      if (resp!=null) {
        //enviar por localstorage
        this.empleado=resp;
        localStorage.setItem('usuario', JSON.stringify(this.empleado));
        console.log(resp);
        Swal.fire(
          'Bienvenido!',
          'Buen Trabajo',
          'success'
        ).then(() => {
          this.router.navigateByUrl('/dashboard/paciente/chart-sectionRT');
        });
      }else{
        Swal.fire(
            'Usuario sin permisos!',
            'El usuario no ingreso credenciales correctas.',
            'warning'
          )

        this._authService.logout();
      }
    });
  }else{
    Swal.fire({
      title: 'Warning',
      text: 'Faltan llenar datos',
      icon: 'warning',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

  loginAuth() {
    //let empleado = new Empleado(null, forma.value.email, forma.value.password);
    this.router.navigateByUrl('/dashboard');
  }


}
