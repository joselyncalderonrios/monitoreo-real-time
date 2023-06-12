
import { Pagination } from '../models/Pagination.model';
import { Atencion } from './Atencion.model';
import { Metrica } from './Metrica.model';

export class Paciente extends Pagination{

  public nroHistoria!: number ;
  public nombres!: string ;
  public apellidoPaterno!: string ;
  public apellidoMaterno!: string ;
  public edad!: number ;
  public talla!: number ;
  public peso!: number  ;
  public dni!: string ;
  public id?:number;
  public estado!: number ;
  public lsmetrica: Array<Metrica> | null = [];
  public lsatencion: Array<Atencion> | null = [];
  public  accion?:String |null;


  public bflageditarnum?: boolean = true;
  public flagatencion?:number;
  public flagmonitorear?:number;
    public idarduino?: number;
    public cantidad!: number;
  constructor(
    // nombres:string,
    // apellidoPaterno:string,
    // apellidoMaterno:string,
    // dni:string

    )
    {
     super();
      // this.nombres=nombres,
      // this.apellidoPaterno=apellidoPaterno,
      // this.apellidoMaterno=apellidoMaterno,
      // this.dni=dni
  }

}
