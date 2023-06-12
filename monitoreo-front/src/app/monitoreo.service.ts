import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_SERVICIOSBACK } from './config/config';
import { PacienteArduino } from './models/PacienteArduino.model';
import { Arduino } from './models/Arduino.model';
@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {


  constructor(public http: HttpClient,
    public router: Router) { }


    cargaListaArduinos() {

      let url = URL_SERVICIOSBACK+ '/pacientearduino/listArduinos';
      return this.http.get(url)
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
    cargaListaArduinosPorDisponibilidad(a:Arduino) {

      let url = URL_SERVICIOSBACK+ '/pacientearduino/listArduinosPorDisponibilidad';
      return this.http.post(url,a)
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

    guardarMonitoreo(pacarduino:PacienteArduino) {

      let url = URL_SERVICIOSBACK + '/pacientearduino/guardarMonitoreo';
      return this.http
      .post(url,pacarduino)
                .pipe(
                  map( (resp: any) => {

                  return resp;

                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );

    }



}
