import { Injectable, OnInit,Component,ViewChild, ElementRef ,ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Empleado } from '../models/Empleado.model';
import { Paciente } from '../models/Paciente.model';
import { URL_SERVICIOSBACK } from '../config/config';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UpdateFlagPacienteDTO } from '../models/UpdateFlagPacienteDTO.model';
import { Pagination } from '../models/Pagination.model';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  constructor(
    public http: HttpClient,
    public router: Router

    ) { }
    cargaListaPacientes(pagination:Pagination) {

      let url = URL_SERVICIOSBACK + '/paciente/list';
      let options = {};
      return this.http.post(url,pagination)
                .pipe(
                  map( (resp: any) => {

                  return resp;
                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );

    }
    cargaListaPacientesSiendoMonitoreados(paciente:Paciente) {

      let url = URL_SERVICIOSBACK + '/paciente/listPacienteSiendoMonitoreados';
      let options = {};
      return this.http.post(url,paciente)
                .pipe(
                  map( (resp: any) => {

                  return resp;
                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );

    }
    guardarPaciente(paciente:Paciente) {

      let url = URL_SERVICIOSBACK + '/paciente/guardar';
      return this.http
      .post(url,paciente)
                .pipe(
                  map( (resp: any) => {

                  return resp;

                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );

    }

    eliminarPaciente(paciente:Paciente) {

      //if(paciente.id!=null){ const encodedId = encodeURIComponent((paciente.id).toString());}

            let url = URL_SERVICIOSBACK + `/paciente/delete/${paciente.id}`;

            return this.http
            .delete(url)
                      .pipe(
                        map( (resp: any) => {

                        return resp;

                      } ),
                      catchError((err: HttpErrorResponse) => {
                          return throwError(err);
                        })
                        );

          }

          modificarFlagAtencion(Objflagatencion:UpdateFlagPacienteDTO) {

            let url = URL_SERVICIOSBACK + '/paciente/flagatencion';

            return this.http
            .post(url,Objflagatencion)
                      .pipe(
                        map( (resp: any) => {

                  console.log('entre');
                        return resp;

                      } ),
                      catchError((err: HttpErrorResponse) => {

                        console.log(err)
                          return throwError(err);
                        })
                        );

          }
          modificarFlagMonitoreo(Objflagatencion:UpdateFlagPacienteDTO) {

            let url = URL_SERVICIOSBACK + '/paciente/flagmonitorear';

            return this.http
            .post(url,Objflagatencion)
                      .pipe(
                        map( (resp: any) => {

console.log('entre');
                        return resp;

                      } ),
                      catchError((err: HttpErrorResponse) => {

                        console.log(err)
                          return throwError(err);
                        })
                        );

          }


          modificarFlagDisponibilidadArduino(Objflagatencion:UpdateFlagPacienteDTO) {

            let url = URL_SERVICIOSBACK + '/pacientearduino/modificarflagdisponible';

            return this.http
            .post(url,Objflagatencion)
                      .pipe(
                        map( (resp: any) => {

console.log('entre');
                        return resp;

                      } ),
                      catchError((err: HttpErrorResponse) => {

                        console.log(err)
                          return throwError(err);
                        })
                        );

          }
          modificarIdArduino(Objflagatencion:UpdateFlagPacienteDTO) {

            let url = URL_SERVICIOSBACK + '/paciente/modificarIdArduino';

            return this.http
            .post(url,Objflagatencion)
                      .pipe(
                        map( (resp: any) => {

                        console.log('entre');
                        return resp;

                      } ),
                      catchError((err: HttpErrorResponse) => {

                        console.log(err)
                          return throwError(err);
                        })
                        );

          }





  public ngOnInit(): void {}

}
