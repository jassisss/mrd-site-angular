import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      full_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      date_created: [null, [Validators.required]],
      usertipo_id: [null, [Validators.required]],
      userstatus_id: [null, [Validators.required]]
    });

  }

}
