import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TesteComponent } from './teste/teste.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ControleComponent } from './controle/controle.component';
import { UserComponent } from './user/user.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule, MatGridListModule, MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [
    AdminComponent,
    TesteComponent,
    ControleComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule
  ]
})
export class AdminModule { }
