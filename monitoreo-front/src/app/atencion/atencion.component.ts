import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AtencionService } from '../atencion.service';
import { AtencionDTO } from '../models/AtencionDTO.model';
import { MatTableDataSource } from '@angular/material/table';
import { AtencionModalComponent } from './atencion-modal/atencion-modal.component';
import { UpdateFlagPacienteDTO } from '../models/UpdateFlagPacienteDTO.model';
import { PacienteService } from '../paciente/paciente.service';
import { Sort } from '@angular/material/sort';
import { ITEMS_PAGINATION, ITEM_PAGE, LIMIT } from '../config/config';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../models/Pagination.model';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss']
})
export class AtencionComponent implements OnInit {

  public atencion: AtencionDTO = new AtencionDTO();
  public pagination: Pagination = new Pagination();
  sortedAtencion:any;
  datosAtencion: AtencionDTO[] = [];
  data!: [];
  totalRegistros! : number;
  pageIndex: number = 0;
  pageSize: number = ITEM_PAGE;
  itemporpagina: any = ITEMS_PAGINATION;
  public updateFlagAtencion:UpdateFlagPacienteDTO= new UpdateFlagPacienteDTO();

  AtencionColumns: string[] = [
    '_idatencion',
    'enfermera',
   'doctor',
   'idpaciente',
    'paciente',
    'dnipaciente',
    'nrohistoriapac',
    '_FechaRegistro',
'estado',
'editar/eliminar'
 ];

 public sortedDataAtencion :  AtencionDTO[] = [];
 constructor(
  private ref: ChangeDetectorRef,
  private _atencionService:AtencionService,
  private _pacienteService:PacienteService,
  private modalService: NgbModal,
  private router: Router
  )
  {
    this.atencion = new AtencionDTO();
    this.atencion.limit = LIMIT;
    this.atencion.offset = 0
  }
  ngOnInit(): void {
    this.retornaAtenciones();
  }
  retornaAtenciones(event?: PageEvent) {
    this.retornaAtenciones$(event)
    .subscribe((pac:any) => this.retornaAtencionesResponse(pac));
  }
  retornaAtenciones$(event?: PageEvent){

    this.pagination= new Pagination();
    this.atencion = new AtencionDTO();

    if (event!=null) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }else {
      this.pageIndex = 0;
      this.pageSize = ITEM_PAGE
    }
    //this.atencion.limit =  this.pageSize;
    //this.atencion.offset = this.pageIndex === 0 ? 0 : (this.pageIndex === 0 ? 1 : this.pageIndex) * this.pageSize;

    this.pagination.limit=this.pageSize;
    this.pagination.offset=this.pageIndex === 0 ? 0 : (this.pageIndex === 0 ? 1 : this.pageIndex) * this.pageSize;
    // this.pagination.limit=5;
    // this.pagination.offset=0;
    return this._atencionService.cargaListaAtenciones(this.pagination);
  }

  retornaAtencionesResponse(atencion: any){
    if (!atencion) {
      this.sortedAtencion = [];
      } else {
      if (atencion.length > 0) {
        this.datosAtencion = atencion;
        if(this.datosAtencion.length > 0){
          if (this.datosAtencion) {
            debugger
            this.totalRegistros = this.datosAtencion[0].cantidad;
            this.datosAtencion.forEach(dc => {
              if(!dc.fechahora){return}
              var dateFormat= new Date(dc.fechahora);
              dc.fecharegistro_format = dateFormat.getDate()+
                 "/"+(dateFormat.getMonth()+1)+
                 "/"+dateFormat.getFullYear()+
                 " "+dateFormat.getHours()+
                 ":"+dateFormat.getMinutes()+
                 ":"+dateFormat.getSeconds();

                 console.log( dc.fecharegistro_format);
            });

          }
          console.log(this.datosAtencion)
          this.sortedAtencion = new MatTableDataSource<AtencionDTO>(this.datosAtencion);
      }

      } else {
        this.totalRegistros = 0;
        this.sortedAtencion = new MatTableDataSource<AtencionDTO>([]);
      }
      }
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.sortedAtencion.filter = filterValue.trim().toLowerCase();
      if (this.sortedAtencion.paginator) {
        this.sortedAtencion.paginator.firstPage();
      }
    }
    // public openModalEdit(pres: Paciente, accion: number) {
    //   const modalParametrosRef = this.modalService.open(PacienteUpdateComponent, {
    //       size: 'lg',
    //        windowClass: 'myCustomModalClass', backdrop: 'static',
    //        keyboard: true,
    //        centered: true,

    //      // this.modalService.close('cancelado'),
    //   });
    //   modalParametrosRef.componentInstance.pacienteDatos = pres;
    //   modalParametrosRef.componentInstance.accionmodal = accion;
    //   modalParametrosRef.result.then((result) => {
    //       if (result != undefined) {
    //         this.retornaPacientes();
    //       }
    //   }, (reason) => {

    //   });
    // }

    public nuevaAtencion() {
      this.atencion = new AtencionDTO();
      this.openModalEdit(this.atencion, 1);
    }
    public onCellClickEdit(data: any): any {
      this.atencion = data;
      console.log(this.atencion);
      this.openModalEdit(this.atencion,0);

    }
    sortData(sort: Sort) {
      const data = this.datosAtencion.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedAtencion = data;
        return;
      }
      this.sortedAtencion = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case '_FechaRegistro': return this.compare(a.fechahora, b.fechahora, isAsc);
          default: return 0;
        }
      });
    }

    compare(a: number | String | Date, b: number | String | Date, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    public openModalEdit(pres: AtencionDTO, accion: number) {
      const modalParametrosRef = this.modalService.open(AtencionModalComponent, {
          size: 'lg',
           windowClass: 'myCustomModalClass', backdrop: 'static',
           keyboard: true,
           centered: true,
         // this.modalService.close('cancelado'),
      });
      modalParametrosRef.componentInstance.atencionDatosDTO = pres;
      modalParametrosRef.componentInstance.accionmodal = accion;
      modalParametrosRef.result.then((result) => {
          if (result != undefined) {
            this.retornaAtenciones();
          }
      }, (reason) => {

      });
    }

    RetornaModificarFlag(Objflagatencion:UpdateFlagPacienteDTO){
      this.retornaModificarFlag$(Objflagatencion)
    }
    retornaModificarFlag$(Objflagatencion:UpdateFlagPacienteDTO){
      return this._pacienteService.modificarFlagAtencion(Objflagatencion)
      .subscribe((resp:any) => {
    console.log('exito')
      });
    }




}
