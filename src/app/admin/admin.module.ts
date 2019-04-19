import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ControleComponent } from './controle/controle.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
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
  MatSortModule, MatGridListModule, MatMenuModule, MatSelectModule, MatPaginatorIntl, MatInputModule, MatCheckboxModule, MatRadioModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { PeriodictComponent } from './periodict/periodict.component';

@NgModule({
  declarations: [
    AdminComponent,
    ControleComponent,
    UserComponent,
    ProductComponent,
    PeriodictComponent
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
    MatMenuModule,
    CdkTableModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: UserComponent}
  ]
})
export class AdminModule { }
