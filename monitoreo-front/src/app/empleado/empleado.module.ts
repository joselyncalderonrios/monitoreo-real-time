import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoCreateComponent } from './empleado-create/empleado-create.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetailsComponent } from './empleado-details/empleado-details.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    EmpleadoCreateComponent,
    EmpleadoListComponent,
    EmpleadoDetailsComponent,
    EmpleadoEditComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule

  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class EmpleadoModule { }
