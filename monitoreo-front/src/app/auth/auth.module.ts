import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';

import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule { }
