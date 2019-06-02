import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserloginModel } from '../shared/model/userlogin-model';
import { NewpasswordModel } from '../shared/model/newpassword-model';
import { DataService } from '../shared/service/data.service';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PasswordDialogComponent } from '../shared/component/password-dialog/password-dialog.component';
import { LySnackBarDismiss } from '@alyle/ui/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild('sb') mySnackBar;

  userAuth: UserloginModel;

  newPassword: NewpasswordModel = {
    email: '',
    password: '',
    newpassword: '',
    password_reset_token: 'ALTERAR SENHA'
  };

  subs: Subscription[] = [];

  newPasswordMessage: string;

  src: string | ArrayBuffer = '../../../../assets/img/avatar-menino-01.png';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private dataService: DataService,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit() {

    this.userAuth = this.authService.getUserAuth();

    const buffer = window.atob(this.userAuth.photo);
    this.src = buffer;
  }

  onLogoff() {

    this.authService.setUserAuth(null, false);
    this.router.navigate(['/login']);

  }

  ngOnDestroy() {

    this.subs.forEach(s =>  s.unsubscribe());

    this.authService.setUserAuth(null, false);

  }

  onNewPassword(data) {
    this.newPassword.email = this.userAuth.email;
    this.newPassword.password = data.password;
    this.newPassword.newpassword = data.newpassword;

    this.dataService.postNewPassword(this.newPassword)
      .subscribe(
        success => {
          this.newPasswordMessage = `Senha do usuário ${this.newPassword.email} alterada.`;
          this.mySnackBar.open();
        },
        error1 => {
          this.newPasswordMessage = `Erro - senha não alterada.`;
          this.mySnackBar.open();
        }
      );
  }

  afterDismissed(e: LySnackBarDismiss) {
  }

  onChangePassword() {
    const status = 'warn';
    this.openConfirmDialog(status);
  }

  openConfirmDialog(status) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data: {
        title: 'ALTERAR SENHA',
        email: this.userAuth.email,
        password_reset_token: 'ALTERARSENHA',
        type: status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onNewPassword(result);
      }
    });
  }
}
