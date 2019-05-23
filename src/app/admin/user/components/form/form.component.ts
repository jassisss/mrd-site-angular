import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'ng2-validation';
import * as $ from 'jquery';

import { DataService } from '../../../../shared/service/data.service';
import { ErrorDialogComponent } from '../../../../shared/component/error-dialog/error-dialog.component';
import { MsgDialogComponent } from '../../../../shared/component/msg-dialog/msg-dialog.component';
import { UserstatusModel } from '../../../../shared/model/userstatus-model';
import { UsertypeModel } from '../../../../shared/model/usertype-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm;

  userForm: FormGroup;
  userStatus: UserstatusModel[];
  userTipo: UsertypeModel[];
  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      passwordConfirm: [null, [Validators.required]],
      user_type_id: [null, [Validators.required]],
      user_status_id: [null, [Validators.required]]
    });

    this.userForm.get('passwordConfirm').setValidators([Validators.required, CustomValidators.equalTo(this.userForm.get('password'))]);

    this.subs.push(this.dataService.getUserStatus()
      .subscribe(
        dados => {
          this.userStatus = dados;
        }));

    this.subs.push(this.dataService.getUserType()
      .subscribe(
        dados => {
          this.userTipo = dados;
        }));

  }

  onSubmit() {
    $('body,html').animate({
      scrollTop: 0
    }, 800);

    if (this.userForm.valid) {
      const data = this.userForm.value;
      delete data.passwordConfirm;
/*      const now = new Date();
      data.date_create = formatDate(now, 'yyyy-M-d hh:mm:ss', 'pt');
      data.date_update = formatDate(now, 'yyyy-M-d hh:mm:ss', 'pt');*/
      data.user_type_id = parseInt(data.user_type_id, 10);
      data.user_status_id = parseInt(data.user_status_id, 10);
      this.dataService.postUser(data).subscribe(
        success => {
          // @ts-ignore
          const msg = `Usuário "${data.email}" incluido.`;
          this.openMsgDialog(msg, 'success', 2500);
          this.router.navigate(['/admin/user/']);
        },
        error => {
          // @ts-ignore
          const msg = `Erro ao tentar incluir usuário "${success.email}".`;
          this.openDialog(msg, error.status);
        },
        () => console.log('Completou')
      );

      this.onReset();
    }

  }

  onReset() {
    $('body,html').animate({
      scrollTop: 0
    }, 800);

    this.myForm.resetForm();

  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

  openDialog(mens, status) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: 'ERRO ' + status,
        message: mens,
        type: 'error'
      }
    });
  }

  openMsgDialog(mens, status, timeout?: number) {
    this.dialog.open(MsgDialogComponent, {
      data: {
        title: 'NOVO USUÁRIO',
        message: mens,
        type: status,
        dismissTimeout: timeout
      }
    });
  }
}
