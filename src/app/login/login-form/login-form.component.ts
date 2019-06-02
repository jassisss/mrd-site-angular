import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/service/auth.service';
import {DataService} from '../../shared/service/data.service';
import {LySnackBarDismiss} from '@alyle/ui/snack-bar';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../login.component.scss']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('sb') mySnackBar;

  @Output() hasError = new EventEmitter();

  loginForm: FormGroup;
  erroMessage = 'Erro no login!';
  withError = false;
  emailClassError: string = null;
  passwordClassError: string = null;

  newPasswordMessage: string;


  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private authService: AuthService,
               private dataService: DataService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

  }

  onSubmit() {

    const lEmail = this.loginForm.get('email');
    const lPassword = this.loginForm.get('password');

    this.withError = true;
    this.emailClassError = null;
    this.passwordClassError = null;

    if (!lEmail.touched || !lEmail.value) {
      this.emailClassError = 'with-error';
      this.withError = true;
      this.erroMessage = 'E-mail deve ser preenchido';
    } else {
      if (!lEmail.valid) {
        this.emailClassError = 'with-error';
        this.withError = true;
        this.erroMessage = 'E-mail inválido';
      } else {
        this.emailClassError = null;
        this.withError = false;
      }
    }

    if (!lPassword.value) {
      this.erroMessage = 'A senha deve ser preenchida';
      this.passwordClassError = 'with-error';
      if (this.withError) {
        this.erroMessage = 'Erro no preenchimento';
      }
      this.withError = true;
    }

    this.hasError.emit({ hasError: this.withError });

    if (!this.withError) {

      const login$ = this.authService.onLogin(this.loginForm.value);

      login$.subscribe(
        dados => {
          this.authService.setUserAuth(dados, true);
          this.withError = false;
          this.erroMessage = '';
          this.router.navigate(['/admin']);
        },
        error1 => {
          this.authService.setUserAuth(null, false);
          this.withError = true;
          this.erroMessage = 'E-mail ou senha incorretos.';
          this.hasError.emit({ hasError: this.withError});
        }
      );

      this.onReset();
      this.emailClassError = null;
      this.passwordClassError = null;

    }

  }

  onReset() {
    this.loginForm.reset();
  }

  clearInput() {
    if (this.emailClassError != null) {
      this.emailClassError = null;
      this.loginForm.get('email').reset();
    }
    if (this.passwordClassError != null) {
      this.passwordClassError = null;
      this.loginForm.get('password').reset();
    }

    this.withError = false;
    this.hasError.emit({ hasError: this.withError });

  }

  afterDismissed(e: LySnackBarDismiss) {
  }

  onLostPassword() {

    const lostEmail$ = this.dataService.postEmailResetPassword(this.loginForm.value);

    lostEmail$.subscribe(
      success => {
        this.newPasswordMessage = `E-mail enviado para ${success.email}`;
        this.mySnackBar.open();
      },
      error1 => {
        this.newPasswordMessage = `Erro - ${error1.error.message}.`;
        this.mySnackBar.open();
      }
    );

  }
}
