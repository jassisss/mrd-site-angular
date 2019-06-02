import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

import {PasswordDialogComponent} from '../password-dialog/password-dialog.component';
import {DataService} from '../../service/data.service';
import {NewpasswordModel} from '../../model/newpassword-model';
import {LySnackBarDismiss} from '@alyle/ui/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  @ViewChild('sb') mySnackBar;

  newPassword: NewpasswordModel = {
    email: '',
    password: '',
    newpassword: '',
    password_reset_token: '',
  };

  subs: Subscription[] = [];

  newPasswordMessage: string;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private dataService: DataService,
               private dialog: MatDialog,
               private location: Location) { }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.newPassword.email = this.route.snapshot.queryParamMap.get('email');
    this.newPassword.password_reset_token = this.route.snapshot.queryParamMap.get('token');
    this.onChangePassword(this.newPassword.email, this.newPassword.password_reset_token);
  }

  afterDismissed(e: LySnackBarDismiss) {
  }

  onNewPassword(data) {
    this.newPassword.password = data.password;
    this.newPassword.newpassword = data.newpassword;

    this.subs.push(this.dataService.postNewPassword(this.newPassword)
      .subscribe(
        success => {
          this.newPasswordMessage = `Senha do usuário ${this.newPassword.email} alterada.`;
          this.mySnackBar.open();
          setTimeout(() => {
            this.location.back();
          }, 2000);
        },
        error1 => {
          this.newPasswordMessage = `Erro - senha não alterada.`;
          this.mySnackBar.open();
          setTimeout(() => {
            this.location.back();
          }, 2000);
        }
      ));
  }

  onNewPasswordReset(data) {
    this.newPassword.email = data.email;
    this.newPassword.password_reset_token = data.password_reset_token;
    this.newPassword.password = data.password;
    this.newPassword.newpassword = data.newpassword;

    console.log(this.newPassword);

    this.subs.push(this.dataService.postNewPasswordReset(this.newPassword)
      .subscribe(
        success => {
          this.newPasswordMessage = `Senha do usuário ${this.newPassword.email} alterada.`;
          this.mySnackBar.open();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error1 => {
          this.newPasswordMessage = `Senha não alterada - ${error1.error.message}`;
          this.mySnackBar.open();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
         }
      ));
  }

  onChangePassword(email, token) {
    const status = 'warn';
    const title = (token === 'ALTERARSENHA') ? 'ALTERAR SENHA' : 'RESETAR SENHA';
    this.openConfirmDialog(title, email, token, status);
  }

  openConfirmDialog(title, email, token, status) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data: {
        title: title,
        email: email,
        password_reset_token: token,
        type: status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.newPassword.password_reset_token === 'ALTERARSENHA') {
          this.onNewPassword(result);
        } else {
          this.onNewPasswordReset(result);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

}
