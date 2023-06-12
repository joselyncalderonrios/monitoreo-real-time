import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AtencionDTO } from './models/AtencionDTO.model';
import { URL_SERVICIOSBACK } from './config/config';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Atencion } from './models/Atencion.model';
import { Pagination } from './models/Pagination.model';
@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  constructor(public http: HttpClient,
    public router: Router) { }
  cargaListaAtenciones(pagination:Pagination) {

    let url = URL_SERVICIOSBACK + '/atencion/listpacjoinAtencion';
    return this.http.post(url,pagination)
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
  eliminarAtencion(atencion:Atencion) {

    //if(paciente.id!=null){ const encodedId = encodeURIComponent((paciente.id).toString());}

          let url = URL_SERVICIOSBACK + `/atencion/delete/${atencion.idatencion}`;

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
        guardarAtencion(atencion:Atencion) {

          let url = URL_SERVICIOSBACK + '/atencion/guardar';
          return this.http
          .post(url,atencion)
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
