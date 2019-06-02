import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

export interface DialogData {
  title: string;
  email: string;
  password_reset_token: string;
  type: string;
}

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  userForm: FormGroup;

  hide = true;

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      email: this.data.email,
      password_reset_token: this.data.password_reset_token,
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newpassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmpassword: [null, [Validators.required]]
    });

    this.userForm.get('confirmpassword').setValidators([Validators.required, CustomValidators.equalTo(this.userForm.get('newpassword'))]);
  }

  onColor(field) {
    return (!this.userForm.get(field).valid && this.userForm.get(field).touched ) ?  'red' : '#eac220';
  }

  isReset() {
    if (this.data.password_reset_token === 'ALTERARSENHA') {
      return true;
    } else {
      this.userForm.get('password').setValue('moke');
      this.userForm.get('password').setValidators(null);
      return false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
