import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';

import {LyGridModule} from '@alyle/ui/grid';
import {LyCheckboxModule} from '@alyle/ui/checkbox';
import {LyButtonModule} from '@alyle/ui/button';
import {LyIconModule} from '@alyle/ui/icon';
import {LyRadioModule} from '@alyle/ui/radio';
import {LyFieldModule} from '@alyle/ui/field';

import { Erro404Component } from './component/erro404/erro404.component';
import { FormDebugComponent } from './component/form-debug/form-debug.component';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
import { ErrorMsgComponent } from './component/error-msg/error-msg.component';
import { MsgDialogComponent } from './component/msg-dialog/msg-dialog.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { PasswordDialogComponent } from './component/password-dialog/password-dialog.component';
import {LySnackBarModule} from '@alyle/ui/snack-bar';

@NgModule({
  declarations: [
    Erro404Component,
    FormDebugComponent,
    ErrorDialogComponent,
    ErrorMsgComponent,
    MsgDialogComponent,
    ConfirmDialogComponent,
    PasswordDialogComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    LyFieldModule,
    LyRadioModule,
    LyIconModule,
    LyButtonModule,
    LyCheckboxModule,
    LyGridModule,
    LySnackBarModule,
    MatTooltipModule
  ],
  exports: [
    Erro404Component,
    FormDebugComponent,
    ErrorDialogComponent,
    ErrorMsgComponent,
    MsgDialogComponent,
    ConfirmDialogComponent,
    PasswordDialogComponent
  ],
  entryComponents: [
    ErrorDialogComponent,
    MsgDialogComponent,
    ConfirmDialogComponent,
    PasswordDialogComponent
  ]
})
export class SharedModule { }
