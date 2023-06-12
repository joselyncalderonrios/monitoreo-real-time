import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOSBACK } from '../config/config';
import {catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FechaRange } from '../models/FenchaRange.model';
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    public http: HttpClient,
    public router: Router
    )


    { }


    getQueryPromedioPorDiaRangoFechasDTO(fecharange:FechaRange) {

      let url = URL_SERVICIOSBACK + '/metrica/listQueryPromedioPorDiaRangoFechas';
      let options = {};
      return this.http.post(url,fecharange)
                .pipe(
                  map( (resp: any) => {
console.log ('se logro la fecha enviar correctamente')
                  return resp;
                } ),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                  })
                  );

    }


}
