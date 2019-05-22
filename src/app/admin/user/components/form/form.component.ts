import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CustomValidators} from 'ng2-validation';
import {formatDate} from '@angular/common';
import * as $ from 'jquery';

import {DataService} from '../../../../shared/service/data.service';
import {UserstatusGeral} from '../../../../shared/model/userstatus-geral';
import {UsertipoGeral} from '../../../../shared/model/usertipo-geral';
import {ErrorDialogComponent} from '../../../../shared/component/error-dialog/error-dialog.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MsgDialogComponent} from '../../../../shared/component/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm;

  userForm: FormGroup;
  userStatus: UserstatusGeral[];
  userTipo: UsertipoGeral[];
  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      full_name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      passwordConfirm: [null, [Validators.required]],
      usertipo_id: [null, [Validators.required]],
      userstatus_id: [null, [Validators.required]]
    });

    this.userForm.get('passwordConfirm').setValidators([Validators.required, CustomValidators.equalTo(this.userForm.get('password'))]);

    this.subs.push(this.dataService.getJsonUserStatus()
      .subscribe(
        dados => {
          this.userStatus = dados;
        }));

    this.subs.push(this.dataService.getJsonUserTipo()
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
      const now = new Date();
      delete data.passwordConfirm;
      data.date_created = formatDate(now, 'yyyy-M-d hh:mm:ss', 'pt');
      data.usertipo_id = parseInt(data.usertipo_id, 10);
      data.userstatus_id = parseInt(data.userstatus_id, 10);
      this.dataService.postJsonUser(data).subscribe(
        success => {
          // @ts-ignore
          const msg = `Usuário "${success.email}" incluido.`;
          this.openMsgDialog(msg, 'success', 10000);
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
