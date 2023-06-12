import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../models/Empleado.model';
import { URL_SERVICIOSBACK } from '../config/config';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(public http: HttpClient,
    public router: Router) { }

    cargaListaEmpleadosxTipo(empleado:Empleado) {

      let url = URL_SERVICIOSBACK + '/empleado/listEmpleadoxtipo';
      return this.http.post(url,empleado)
                .pipe(
                  map( (resp: any) => {
  console.log(resp)
                  return resp;
                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );
    }

    guardarEmpleado(empleado:Empleado) {
debugger
      let url = URL_SERVICIOSBACK + '/empleado/guardar';
      return this.http.post(url,empleado)
                .pipe(
                  map( (resp: any) => {
  console.log(resp)
                  return resp;
                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );
    }







}
