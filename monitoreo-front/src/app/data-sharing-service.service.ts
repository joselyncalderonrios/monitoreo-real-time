import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataSharingServiceService {
  private variableEmitida = new Subject<string>();
  
  variableRegistro$ = this.variableEmitida.asObservable();

  setVariableRegistro(valor: string) {
    this.variableEmitida.next(valor);
  }
  constructor() { }
}
