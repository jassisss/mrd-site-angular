import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserstatusGeral} from '../../../../shared/model/userstatus-geral';
import {Subscription} from 'rxjs';
import {DataService} from '../../../../shared/service/data.service';
import {UsertipoGeral} from '../../../../shared/model/usertipo-geral';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

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
    console.log(this.userForm.value);
  }

  onReset() {
    this.userForm.reset();
  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

}
