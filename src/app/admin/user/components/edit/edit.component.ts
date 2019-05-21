import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserstatusGeral} from '../../../../shared/model/userstatus-geral';
import {UsertipoGeral} from '../../../../shared/model/usertipo-geral';
import {Subscription} from 'rxjs';
import {DataService} from '../../../../shared/service/data.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  userStatus: UserstatusGeral[];
  userTipo: UsertipoGeral[];
  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Cria o formulário
    this.onCreateForm();

    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(id => this.dataService.getJsonUser(id))
      )
      .subscribe(
        (user) => this.onUpdateForm(user));

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
      full_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      date_created: [null, [Validators.required]],
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

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

}
