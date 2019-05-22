import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Erro404Component } from './component/erro404/erro404.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule} from '@angular/material';
import { FormDebugComponent } from './component/form-debug/form-debug.component';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
import { ErrorMsgComponent } from './component/error-msg/error-msg.component';
import { MsgDialogComponent } from './component/msg-dialog/msg-dialog.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    Erro404Component,
    FormDebugComponent,
    ErrorDialogComponent,
    ErrorMsgComponent,
    MsgDialogComponent,
    ConfirmDialogComponent
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
    Erro404Component,
    FormDebugComponent,
    ErrorDialogComponent,
    ErrorMsgComponent
  ],
  entryComponents: [
    ErrorDialogComponent,
    MsgDialogComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
