
import { Pagination } from '../models/Pagination.model';

export class Empleado extends Pagination{

  public nombres?: string;
  public apellidoPaterno?: string;
  public apellidoMaterno?: string;
  public dni?: string;
  public tipoEmpleado?: string;
  public user?: string;
  public pass?: string;
  public id? : number;

  // constructor(
  //   nombres:string,
  //   apellidoPaterno:string,
  //   apellidoMaterno:string,
  //   dni:string,
  //   tipoEmpleado:string,
  //   user:string,
  //   pass:string
  //   )
  //   {
  //   super();
  //     this.nombres=nombres,
  //     this.apellidoPaterno=apellidoPaterno,
  //     this.apellidoMaterno=apellidoMaterno,
  //     this.dni=dni,
  //     this.tipoEmpleado=tipoEmpleado,
  //     this.user=user,
  //     this.pass=pass;
  // }


}
