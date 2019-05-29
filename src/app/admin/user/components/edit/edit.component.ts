import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as $ from 'jquery';

import { DataService } from '../../../../shared/service/data.service';
import { ErrorDialogComponent } from '../../../../shared/component/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';
import { MsgDialogComponent } from '../../../../shared/component/msg-dialog/msg-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/component/confirm-dialog/confirm-dialog.component';
import { UserstatusModel } from '../../../../shared/model/userstatus-model';
import { UsertypeModel } from '../../../../shared/model/usertype-model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm;

  userForm: FormGroup;
  userStatus: UserstatusModel[];
  userTipo: UsertypeModel[];
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
        switchMap(id => this.dataService.getUser(id))
      )
      .subscribe((user) => this.onUpdateForm(user));

  }

  onUpdateForm(user) {

    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      date_create: user.date_create,
      user_type_id: user.user_type_id,
      user_status_id: user.user_status_id
    });

  }

  onCreateForm() {

    this.userForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      email: [null, [Validators.required, Validators.email]],
      user_type_id: [null, [Validators.required]],
      user_status_id: [null, [Validators.required]]
    });

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
/*      const now = new Date();
      data.date_create = formatDate(now, 'yyyy-MM-d hh:mm:ss', 'pt');
      data.date_update = formatDate(now, 'yyyy-MM-d hh:mm:ss', 'pt');*/
      this.dataService.putUser(data).subscribe(
        success => {
          // @ts-ignore
          const msg = `Usuário '${data.email}' alterado.`;
          this.openMsgDialog(msg, 'success', 2500);
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
    this.dataService.deleteVirtualUser(this.userForm.value.id).subscribe(
      success => this.onReset(),
      error => {
        const mens = `Erro ao tentar excluir o usuários "${this.userForm.value.email}"`;
        this.openDialog(mens, error.status);
      }
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
