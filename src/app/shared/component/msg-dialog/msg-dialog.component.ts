import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  title: string;
  message: string;
  type: string;
  dismissTimeout: number;
}

@Component({
  selector: 'app-msg-dialog',
  templateUrl: './msg-dialog.component.html',
  styleUrls: ['./msg-dialog.component.scss']
})
export class MsgDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MsgDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    if (this.data.dismissTimeout > 0) {
      setTimeout(() => this.onNoClick(), this.data.dismissTimeout);
    } else {
      setTimeout(() => this.onNoClick(), 4000);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
