import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartSectionRTComponent } from './chart-sectionRT/chart-section-rt.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
  ],
  imports: [
    NgxChartsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),


  ],
  providers: [
    NgbActiveModal
  ]
})
export class ChartModule {

 }
