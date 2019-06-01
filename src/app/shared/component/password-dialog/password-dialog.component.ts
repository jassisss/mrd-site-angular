import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  title: string;
  message: string;
  type: string;
}

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
