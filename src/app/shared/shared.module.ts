import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavComponent } from './component/sidenav/sidenav.component';
import { Erro404Component } from './component/erro404/erro404.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule} from '@angular/material';
import { FormDebugComponent } from './component/form-debug/form-debug.component';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    SidenavComponent,
    Erro404Component,
    FormDebugComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    SidenavComponent,
    Erro404Component,
    FormDebugComponent,
    ErrorDialogComponent
  ],
  entryComponents: [
    ErrorDialogComponent
  ]
})
export class SharedModule { }
