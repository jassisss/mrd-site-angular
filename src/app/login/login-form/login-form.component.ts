import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../login.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() hasError = new EventEmitter();

  loginForm: FormGroup;
  erroMessage = 'Erro no login!';
  withError = false;
  emailClassError: string = null;
  passwordClassError: string = null;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, Validators.required]
    });

  }

  onSubmit() {

    const lEmail = this.loginForm.get('loginEmail');
    const lPassword = this.loginForm.get('loginPassword');

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

    if (!lPassword.touched || !lPassword.value) {
      this.erroMessage = 'A senha deve ser preenchida';
      this.passwordClassError = 'with-error';
      if (this.withError) {
        this.erroMessage = 'Erro no preenchimento';
      }
      this.withError = true;
    }

    this.hasError.emit({ hasError: this.withError });

    if (!this.withError) {
      this.onReset();
      console.log(this.loginForm.controls.loginEmail);
      this.emailClassError = null;
      this.passwordClassError = null;
      this.withError = false;
      this.erroMessage = '';
    }

  }

  onReset() {
    this.loginForm.reset();
  }

  clearInput() {
    if (this.emailClassError != null) {
      this.emailClassError = null;
      this.loginForm.get('loginEmail').reset();
    }
    if (this.passwordClassError != null) {
      this.passwordClassError = null;
      this.loginForm.get('loginPassword').reset();
    }

    this.withError = false;
    this.hasError.emit({ hasError: this.withError });

  }

}
