import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserstatusGeral} from '../../../../shared/model/userstatus-geral';
import {UsertipoGeral} from '../../../../shared/model/usertipo-geral';
import {Subscription} from 'rxjs';
import {DataService} from '../../../../shared/service/data.service';

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
              private dataService: DataService) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
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
