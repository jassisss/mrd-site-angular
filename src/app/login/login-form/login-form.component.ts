import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../login.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = FormGroup;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    // @ts-ignore
    this.loginForm = this.formBuilder.group({
      loginName: [null, Validators.required],
      loginPassword: [null, Validators.required]
    });

  }

  onSubmit(formulario) {
    this.onReset(formulario);
  }

  onReset(formulario) {
    formulario.reset();
  }

  getErrorMessage() {
/*    if (this.loginName.hasError('required') && this.loginPassword.hasError('required')) {
      return 'Erro no login';
    }
    if (this.loginName.hasError('required')) {
      return 'Usuário é requerido';
    }
    if (this.loginPassword.hasError('required')) {
      return 'Usuário é requerido';
    }*/
    return 'Erro';
  }

}
