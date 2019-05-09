import { CommonModule } from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ControleComponent } from './controle/controle.component';
import { UserComponent } from './user/components/list/user.component';
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
  MatSortModule,
  MatGridListModule,
  MatMenuModule,
  MatSelectModule,
  MatPaginatorIntl,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { PeriodictComponent } from './periodict/periodict.component';
import { ReadingComponent } from './reading/reading.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AdminComponent,
    ControleComponent,
    ProductComponent,
    PeriodictComponent,
    ReadingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    UserModule,
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
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
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
    {provide: MatPaginatorIntl, useClass: UserComponent},
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class AdminModule { }
