import { Injectable, OnInit,Component,ViewChild, ElementRef ,ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Empleado } from 'src/app/models/Empleado.model';
import { Paciente } from 'src/app/models/Paciente.model';
import { PacienteService } from '../paciente.service';
import { ITEMS_PAGINATION, ITEM_PAGE, LIMIT } from 'src/app/config/config';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteDetailsComponent } from '../paciente-details/paciente-details.component';
import { Metrica } from 'src/app/models/Metrica.model';
import { PacienteUpdateComponent } from '../paciente-update/paciente-update.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MqttClientComponent } from 'src/app/mqttClient/mqtt-client.component';
import { MqttService } from 'ngx-mqtt';
import { AtencionCreateComponent } from 'src/app/atencion/atencion-create/atencion-create.component';
import { AtencionModalComponent } from 'src/app/atencion/atencion-modal/atencion-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MonitoreoCreateComponent } from 'src/app/monitoreo/monitoreo-create/monitoreo-create.component';
import Swal from 'sweetalert2';
import { UpdateFlagPacienteDTO } from 'src/app/models/UpdateFlagPacienteDTO.model';
import { Pagination } from 'src/app/models/Pagination.model';


@Component({

  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit{
  // @ViewChild(MqttClientComponent)
  // _mqttClient!: MqttClientComponent;
  private _mqttClient: MqttClientComponent = new MqttClientComponent(this._mqttService);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 // @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @Output() searchEmmiter: EventEmitter<any> = new EventEmitter<any>();
  public paciente: Paciente;
  public usersto: any = {};
  public itemsPerPage: number = LIMIT;
	public textoFiltro: String = "Todos los Pacientes";
  accionmodalHistorico:any;
  sortedPaciente:any;
  datosPaciente: Paciente[] = [];
  data!: [];
  totalRegistros! : number;
  pageIndex: number = 0;
  pageSize: number = ITEM_PAGE;
  itemporpagina: any = ITEMS_PAGINATION;
  public pagination: Pagination = new Pagination();
  PacienteColumns: string[] = [
     '_id',
     'nrohistoria',
    'dni',
     'apellido_pat',
     'apellido_mat',
     'nombres',
     'edad',
     'talla',
     'peso',
 'estado',
 'editar',
 'crear-atencion',
 'monitorear',
 'metricas'
  ];
  condChMonitoreo!: boolean;
  public updateFlagPaciente:UpdateFlagPacienteDTO= new UpdateFlagPacienteDTO();
 constructor(
  private ref: ChangeDetectorRef ,
  private _pacienteService:PacienteService,
  private modalService: NgbModal,
  private router: Router,
  private _mqttService: MqttService

  ) {
    this._mqttClient=this._mqttClient;
    this.paciente = new Paciente();
		this.paciente.limit = LIMIT;
		this.paciente.offset = 0
    console.log(this.sortedPaciente)
  }

 ngOnInit(): void {
  this.retornaPacientes();
}

retornaPacientes(event?: PageEvent) {
  this.retornaPacientes$(event)
    .subscribe((pac:any) => this.retornaPacienteResponse(pac));
}
retornaPacientes$(event?: PageEvent){
  debugger
  this.pagination= new Pagination();
  this.paciente = new Paciente();
  if (event!=null) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
}else {
  this.pageIndex = 0;
  this.pageSize = ITEM_PAGE
}
this.pagination.limit=this.pageSize;
    this.pagination.offset=this.pageIndex === 0 ? 0 : (this.pageIndex === 0 ? 1 : this.pageIndex) * this.pageSize;
  return this._pacienteService.cargaListaPacientes(this.pagination);
}
retornaPacienteResponse(paciente: any){
  if (!paciente) {
    this.sortedPaciente = [];
    } else {
    if (paciente.length > 0) {
      this.datosPaciente = paciente;
      if(this.datosPaciente.length > 0){
        if (this.datosPaciente) {
          this.totalRegistros = this.datosPaciente[0].cantidad;
        }

    }
    console.log(this.datosPaciente)
    this.sortedPaciente = new MatTableDataSource<Paciente>(this.datosPaciente);
    } else {
      this.totalRegistros = 0;
      this.sortedPaciente = new MatTableDataSource<Paciente>([]);;
    }
    }
  }
async onSlideToggleChange(checked: boolean,data: any) : Promise<any> {
  debugger
  if (checked) {
    this.paciente = data;
    try {
      await this.openModalMonitorear(this.paciente, 1)
      .then(()=>{
      this.retornaPacientes();
    });
    this.retornaPacientes();
     // Actualiza la tabla después de confirmar el registro en el modal
    } catch (error) {
      this.retornaPacientes();
      // Maneja el caso en que se cancele el registro en el modal
    }

  }else{
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de cancelar el monitoreo del paciente ' + data.nombres + ' ' +data.apellidoPaterno,
      showCancelButton: true,
      confirmButtonText: 'OK',
       }).then(async (result) => {
            if (result.isConfirmed) {
               await this.ModificarFlagMonitoreo(data);
               this.ModificarFlagDispArduino(data);
               Swal.fire(this.retornaMensaje(), '', 'success')
               .then(()=>{
                localStorage.setItem('nombreMonitoreo','Nadie');
               });
            }else{
              this.retornaPacientes();
            }
    });
  }
}
ModificarFlagMonitoreo(data: any){
  this.updateFlagPaciente = new UpdateFlagPacienteDTO();
  this.updateFlagPaciente.flagmonitorear=0;
  this.updateFlagPaciente.idpaciente=data.id;
  this.updateFlagPaciente.idArduino=0;

  return this._pacienteService.modificarFlagMonitoreo(this.updateFlagPaciente)
  .subscribe((resp:any) => {
      console.log('exito')
    this.retornaPacientes();
  });
}
//cancelar el monitoreo
ModificarFlagDispArduino(data: any){
  debugger
  this.updateFlagPaciente = new UpdateFlagPacienteDTO();
  this.updateFlagPaciente.idArduino=data.idarduino;
  this.updateFlagPaciente.flagdisponible=0;
  return this._pacienteService.modificarFlagDisponibilidadArduino(this.updateFlagPaciente)
  .subscribe((resp:any) => {
console.log('exito')
  });
}


retornaMensaje(): string {
  return 'Se dejo de monitorear Exitosamente'
}

public openModalMonitorear(pres: Paciente, accion: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
  const modalParametrosRef = this.modalService.open(MonitoreoCreateComponent, {
      size: 'lg',
       windowClass: 'myCustomModalClass', backdrop: 'static',
       keyboard: true,
       centered: true,

     // this.modalService.close('cancelado'),
  });
  modalParametrosRef.componentInstance.pacienteDatos = pres;
  modalParametrosRef.componentInstance.accionmodal = accion;
  modalParametrosRef.result.then((result) => {
    if (result !== undefined) {
      resolve(); // Resuelve la promesa cuando se confirma el registro en el modal
    } else {
      reject(); // Rechaza la promesa si no se confirma el registro
    }
  }, (reason) => {
    reject(); // Rechaza la promesa en caso de que el modal se cierre sin confirmar el registro
  });
});
}
navigateToGrafica(data: any): any {

  //estoy mostrando data historica o guardada en bd
  this.accionmodalHistorico = 1;
  data.lsmetricas=[]
  const arrayString = JSON.stringify(data);
  const url = `dashboard/paciente/chart-section?parametro=${this.accionmodalHistorico}
  &array=${encodeURIComponent(arrayString)}`;
  //const url = `dashboard/paciente/chart-section`;

  this.router.navigateByUrl(url);
}

  ngAfterViewInit() {
    // this.sortedPaciente.paginator= this.paginator;
    // this.sortedPaciente.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sortedPaciente.filter = filterValue.trim().toLowerCase();
    if (this.sortedPaciente.paginator) {
      this.sortedPaciente.paginator.firstPage();
    }
  }


  public onCellClickEdit(data: any): any {
		this.paciente = data;
   // console.log(this.paciente);
    this.openModalEdit(this.paciente,0);

	}
  public nuevoPaciente() {
    this.paciente = new Paciente();
    this.paciente.lsmetrica = [];
    this.paciente.lsatencion = [];
    this.openModalEdit(this.paciente, 1);
  }
  public async  onCellClick(data: any): Promise<any> {

		this.paciente = data;
    try {
      await this.openModal(this.paciente);
      this.retornaPacientes(); // Actualiza la tabla después de confirmar el registro en el modal
    } catch (error) {
      // Maneja el caso en que se cancele el registro en el modal
    }

	}

  public openModal(pres: Paciente): Promise<void>  {
    return new Promise<void>((resolve, reject) => {
    const modalParametrosRef = this.modalService.open(AtencionModalComponent, {
        size: 'lg',
         windowClass: 'myCustomModalClass', backdrop: 'static',
         keyboard: true,
         centered: true,
    });
    modalParametrosRef.componentInstance.pacienteDatos = pres;
    modalParametrosRef.result.then((result) => {
      if (result !== undefined) {
        resolve(); // Resuelve la promesa cuando se confirma el registro en el modal
      } else {
        reject(); // Rechaza la promesa si no se confirma el registro
      }
    }, (reason) => {
      reject(); // Rechaza la promesa en caso de que el modal se cierre sin confirmar el registro
    });
  });
}
  //modalatencion-enviaridpaciente
//   public openModal(pres: Paciente) {
//     const modalParametrosRef = this.modalService.open(AtencionModalComponent, {
//         size: 'lg',
//          windowClass: 'myCustomModalClass', backdrop: 'static',
//          keyboard: true,
//          centered: true,

//        // this.modalService.close('cancelado'),
//     });
//     modalParametrosRef.componentInstance.pacienteDatos = pres;
//     modalParametrosRef.result.then((result) => {
//
//         if (result) {
//           this.retornaPacientes();
//         }
//     }, (reason) => {

//     });
// }

public openModalEdit(pres: Paciente, accion: number) {
  const modalParametrosRef = this.modalService.open(PacienteUpdateComponent, {
      size: 'lg',
       windowClass: 'myCustomModalClass', backdrop: 'static',
       keyboard: true,
       centered: true,

     // this.modalService.close('cancelado'),
  });
  modalParametrosRef.componentInstance.pacienteDatos = pres;
  modalParametrosRef.componentInstance.accionmodal = accion;
  modalParametrosRef.result.then((result) => {
      if (result != undefined) {
        this.retornaPacientes();
      }
  }, (reason) => {

  });
}

// sortData(sort: Sort) {
//   const data = this.datosPaciente.slice();
//   if (!sort.active || sort.direction === '') {
//     this.sortedPaciente = data;
//     return;
//   }
//   this.sortedPaciente = data.sort((a, b) => {
//     const isAsc = sort.direction === 'asc';
//     switch (sort.active) {
//     case '_id': return this.compare(a._id, b._id, isAsc);
//     case 'dni': return this.compare(a.dni, b.dni, isAsc);
//     case 'apellidopaterno': return this.compare(a.apellidoPaterno, b.apellidoPaterno, isAsc);
//     case 'apellidomaterno': return this.compare(a.apellidoMaterno, b.apellidoMaterno, isAsc);
//     case 'nombres': return this.compare(a.nombres, b.nombres, isAsc);
//     case 'edad': return this.compare(a.edad, b.edad, isAsc);
//     case 'peso': return this.compare(a.peso, b.peso, isAsc);
//     case 'talla': return this.compare(a.talla, b.talla, isAsc);
//     default: return 0;
//     }
//   });
//   }
//   compare(a: number | String | Date, b: number | String | Date, isAsc: boolean) {
// 		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// 	  }
// public cambiaPagina(config: any, page: number, texto: String): any {
//   this.textoFiltro = texto;
//   this.paciente = new Paciente();
//   this.paciente.limit = this.itemsPerPage;
//   this.paciente.offset = (page - 1) * this.itemsPerPage
//   this.data = [];
//   this._pacienteService.cargaListaPacientes(this.paciente).subscribe(paciente => {
//     this.data = paciente.aaData
//     // this.length = this.data.length;
//     // if (this.length > 0) {
//     //   this.totalRegistros = paciente.aaData[0].cantidad
//     // } else {
//     //   this.totalRegistros = 0;
//     // }
//     //this.onChangeTable(this.config, true);
//   });
// }
// public config: any = {
//   paging: true,
//   sorting: {
//     columns: this.columns
//   },
//   className: ['table-striped', 'table-bordered']
// };
// public onChangeTable(config: any, page: any = {
//   page: this.page,
//   itemsPerPage: this.itemsPerPage
// }): any {
//   if (config.filtering) {
//     Object.assign(this.config.filtering, config.filtering);
//   }
//   if (config.sorting) {
//     Object.assign(this.config.sorting, config.sorting);
//   }
//   let filteredData = this.changeFilter(this.data, this.config);
//   let sortedData = this.changeSort(filteredData, this.config);
//   this.rows = page && config.paging ? this.changePage(page) : sortedData;
//   this.length = sortedData.length;
//   this.ref.detectChanges();
// }

}
