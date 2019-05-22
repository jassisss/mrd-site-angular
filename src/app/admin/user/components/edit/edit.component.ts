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
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Cria o formulário
    this.onCreateForm();
/*
    this.route.params.subscribe(
      (params: any) => {
        const id = params.id;
        const user$ = this.dataService.getJsonUser(id);
        user$.subscribe(user => {
          this.onUpdateForm(user);
        });
      });*/
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
        success => console.log('Sucesso: ', success),
        error => console.log('Erro: ', error),
        () => console.log('Completou: ')
      );

      this.onReset();
    }

  }

  onDelete(e) {
    e.stopPropagation();
    this.dataService.delJsonUser(this.userForm.value.id).subscribe(
      success => this.onReset(),
      error => console.log('Erro: ', error),
      () => console.log('Completou: ')
    );
  }

  onReset() {

    this.router.navigate(['/admin/user/']);

  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

}
