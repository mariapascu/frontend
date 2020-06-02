import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData{
  error: string;
}

@Component({
  selector: 'app-failure-dialog',
  templateUrl: './failure-dialog.component.html',
  styleUrls: ['./failure-dialog.component.css']
})
export class FailureDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FailureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
