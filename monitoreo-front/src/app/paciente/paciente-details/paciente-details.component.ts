import { AfterViewInit,Injectable, OnInit,Component,ViewChild, ElementRef ,ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Empleado } from 'src/app/models/Empleado.model';
import { Paciente } from 'src/app/models/Paciente.model';
import { PacienteService } from '../paciente.service';
import { LIMIT } from 'src/app/config/config';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Metrica } from 'src/app/models/Metrica.model';
import { Router } from '@angular/router';




@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.scss']
})

export class PacienteDetailsComponent implements OnInit{
 // canClose: boolean = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   @Output() searchEmmiter: EventEmitter<any> = new EventEmitter<any>();
   modalRef!: NgbModalRef;
   @Input() pacienteDatos: any;


 // dataSource!: MatTableDataSource<Metrica>;
 sortedMetricas:any;
  public datosMetrica:Metrica[] = [];
  public paciente!: Paciente;
  public usersto: any = {};
  public itemsPerPage: number = LIMIT;
	public textoFiltro: String = "Todos los Pacientes";
  public localStorage_empleado: any = {};
  datosPaciente: Paciente[] = [];
  data!: [];
  PacienteColumns: string[] = [
     'id',
     'idarduino',
     'valor',
     'fechahora'

  ];


  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router
    ) {
  }
  // ngOnDestroy(): void {
  //   if (this.modalRef != null) {
  //     this.modalRef.close();
  //   }
  // }
  ngOnInit(): void {
    

    this.datosPaciente = Object.assign({}, this.pacienteDatos);
    console.log(this.pacienteDatos)
    this.datosMetrica= this.pacienteDatos.lsmetricas;
    console.log("datosmetrica:" + this.datosMetrica)
    this.pacienteDatos.lsmetricas.map(
      (dc:any) => {
  if(!dc.fechahora){return}
  var dateFormat= new Date(dc.fechahora);
  dc.fechahora_format = dateFormat.getDate()+
     "/"+(dateFormat.getMonth()+1)+
     "/"+dateFormat.getFullYear()+
     " "+dateFormat.getHours()+
     ":"+dateFormat.getMinutes()+
     ":"+dateFormat.getSeconds();
});
    this.sortedMetricas = new MatTableDataSource(this.pacienteDatos.lsmetricas);

  }
  cerrarModalYRedirigir(): void {
    // Cerrar el modal aquí (código para cerrar el modal)
    this.activeModal.close('Cancelado');
    // Redirigir a otra página después de un breve retraso (por ejemplo, 500 ms)
    setTimeout(() => {
      // Opción 1: Utilizando window.location.href
      //window.location.href = 'dashboard/paciente/chart-section';

      // Opción 2: Utilizando el enrutador de Angular

        const arrayString = JSON.stringify(this.pacienteDatos);
       this.router.navigate(['dashboard/paciente/chart-section',{ data: arrayString }]);
    }, 500);

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sortedMetricas.filter = filterValue.trim().toLowerCase();
    if (this.sortedMetricas.paginator) {
      this.sortedMetricas.paginator.firstPage();
    }
  }
  onCloseHandled() {
    this.activeModal.close('Cancelado');
}


}


