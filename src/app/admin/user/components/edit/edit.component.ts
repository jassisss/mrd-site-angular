import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import * as $ from 'jquery';

import {DataService} from '../../../../shared/service/data.service';
import {UserstatusGeral} from '../../../../shared/model/userstatus-geral';
import {UsertipoGeral} from '../../../../shared/model/usertipo-geral';
import {formatDate} from '@angular/common';
import {ErrorDialogComponent} from '../../../../shared/component/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {MsgDialogComponent} from '../../../../shared/component/msg-dialog/msg-dialog.component';
import {ConfirmDialogComponent} from '../../../../shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm;

  userForm: FormGroup;
  userStatus: UserstatusGeral[];
  userTipo: UsertipoGeral[];
  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    // Cria o formulário
    this.onCreateForm();

    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(id => this.dataService.getJsonUser(id))
      )
      .subscribe((user) => this.onUpdateForm(user));

  }

  onUpdateForm(user) {

    this.userForm.patchValue({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      date_created: user.date_created,
      usertipo_id: user.usertipo_id,
      userstatus_id: user.userstatus_id
    });

  }

  onCreateForm() {

    this.userForm = this.formBuilder.group({
      id: [null],
      full_name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      email: [null, [Validators.required, Validators.email]],
      usertipo_id: [null, [Validators.required]],
      userstatus_id: [null, [Validators.required]]
    });

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
      data.date_created = formatDate(now, 'yyyy-MM-d hh:mm:ss', 'pt');
      this.dataService.putJsonUser(data).subscribe(
        success => {
          // @ts-ignore
          const msg = `Usuário '${success.email}' alterado.`;
          this.openMsgDialog(msg, 'success', 300);
          this.router.navigate(['/admin/user/']);
        },
        error => {
          const msg = 'Erro ao tentar alterar usuário.';
          this.openDialog(msg, error.status);
        },
        () => console.log('Completou: ')
      );

      this.onReset();
    }

  }

  onDelete(e) {
    e.stopPropagation();
    const msg = `Confirma a exclusão do usuário '${this.userForm.value.email}'?`;
    this.openConfirmDialog(msg, 'warn');
  }

  onConfirmDelete() {
    this.dataService.delJsonUser(this.userForm.value.id).subscribe(
      success => this.onReset(),
      error => {
        const mens = `Erro ao tentar excluir o usuários "${this.userForm.value.email}"`;
        this.openDialog(mens, error.status);
      },
      () => console.log('Completou: ')
    );
  }
  onReset() {

    this.router.navigate(['/admin/user/']);

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
        title: 'EDITAR USUÁRIO',
        message: mens,
        type: status,
        dismissTimeout: timeout
      }
    });
  }

  openConfirmDialog(mens, status) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'EXCLUIR USUÁRIO',
        message: mens,
        type: status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onConfirmDelete();
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

}
