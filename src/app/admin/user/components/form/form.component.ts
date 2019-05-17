import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as $ from 'jquery';

import {DataService} from '../../../../shared/service/data.service';
import {UserstatusGeral} from '../../../../shared/model/userstatus-geral';
import {UsertipoGeral} from '../../../../shared/model/usertipo-geral';
import {CustomValidators} from 'ng2-validation';

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
              private dataService: DataService) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
      usertipoId: [null, [Validators.required]],
      userstatusId: [null, [Validators.required]]
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

    this.onReset();

    if (this.userForm.valid) {
      // TODO
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

}
