import {   HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../models/Empleado.model';
import { URL_SERVICIOSBACK } from '../config/config';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

declare let swal: any;
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token!: string;
  empleado:Empleado | undefined;


  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.cargarStorage();
   }
   loginAuth(empleado:Empleado) {

    let url = URL_SERVICIOSBACK+ '/empleado/consultaempleadologin';
    return this.http
    .post(url,empleado)
    .pipe (
    map((resp: any) => {
      console.log("service" + resp);
      return resp;
    })

    );

   }

   cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')!;
      this.empleado = JSON.parse(localStorage.getItem('empleado')|| '{}');
    } else {
      this.token = '';
      this.empleado = null!;
    }
  }
  guardarStorage(id: string, token: string, empleado: Empleado) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('empleado', JSON.stringify(empleado));
    this.empleado = empleado;
    this.token = token;

  }
  setStorageUsuario(
    emp: any,
    token: string,

  ) {

    localStorage.setItem('empleado', JSON.stringify(emp));
    localStorage.setItem('token', token);
    this.empleado = emp;
  }
  logout() {
    this.empleado = null!;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('empleado');
    this.router.navigate(['/login']);
  }

}
