import { Timestamp } from "rxjs";
import { Pagination } from "./Pagination.model";

export class AtencionDTO extends Pagination{

  public idatencion!: number ;
  public fechahora!: Date ;
  public estado!: number ;

  public idenfermera!: number ;
  public nomenf!: string ;
  public apepatenf!: string ;
  public apematenf!: string ;

  public iddoctor!: number ;
  public nomdoc!: string ;
  public apepatdoc!: string ;
  public apematdoc!: string ;
  public nrohistoria!: number ;
  public idpaciente!: number ;
  public nompac!: string ;
  public apepapac!: string ;
  public apemapac!: string ;

  public dnipac!: string ;
  public fecharegistro_format?: String | null;
  public cantidad!: number;



}
