import { Component, ViewChild,ChangeDetectorRef ,OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver} from '@angular/cdk/layout'
import { NavigationBehaviorOptions, NavigationExtras, Router } from '@angular/router';
import { Empleado } from '../models/Empleado.model';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit{

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;
  accionmodalRT:any;
  nombreLogueado!:string;
  public empleado:Empleado= new Empleado();
  constructor(
    private observer:BreakpointObserver,
     private cd :ChangeDetectorRef,
     private router: Router
     ){
      this.empleado = new Empleado();
    }


  ngOnInit(): void {

    const usuarioGuardado = localStorage.getItem('usuario');
    if(usuarioGuardado){
      debugger
      this.empleado = JSON.parse(usuarioGuardado);
      this.empleado.user?this.nombreLogueado=this.empleado.user:'';
      console.log(this.empleado.id)

    }


  }

  ngAfterViewInit(){

    this.observer.observe(['(max-width:800px)'])
    .subscribe((resp: any)=>{
        console.log(resp);
        if(resp.matches){
          this.sidenav.mode='over';
          this.sidenav.close();
        }else{
          this.sidenav.mode='side';
          this.sidenav.open();
        }
    })
    this.cd.detectChanges();
  }
recargarTablaPacientes() {

  //const currentUrl = this.router.url;
  //console.log(currentUrl)
  this.router.navigateByUrl('dashboard/paciente/pacientes', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl('dashboard/paciente/pacientes');
  });
}
navigateToGrafica(): any {
  const url = `dashboard/paciente/chart-sectionRT`;

  //estoy NAVEGANDO LA GRAFICA EN TIEMPO REAL
 // this.accionmodalRT = 0;
//  const navigationExtras: NavigationExtras = {
//   skipLocationChange: true // Evita añadir la ruta destino al historial del navegador
// };
// const navigationOptions: NavigationBehaviorOptions = {
//   replaceUrl: true // Reemplaza la URL actual en el navegador con la URL destino
// };

  this.router.navigateByUrl(url).then(() => {
    window.location.reload();
  });
  // this.router.navigateByUrl(url, navigationExtras).then(() => {
  //   // Realiza el reload solo en la página destino
  //   this.router.navigate([url], navigationOptions);
  // });
}

  logout(){
    this.router.navigateByUrl('login');
  }

}
