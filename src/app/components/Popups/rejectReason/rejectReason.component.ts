import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rejectReason',
  templateUrl: './rejectReason.component.html',
  styleUrls: ['./rejectReason.component.scss']
})
export class rejectReasonComponent {

  name!: string;

  constructor(private dialogRef: MatDialogRef<rejectReasonComponent>, private snackBar: MatSnackBar) {

  }

  close() {
    if (!this.name) {
      this.dialogRef.close()
    }else {
      this.dialogRef.close({date: this.name})
    }
  }

  reject() {
    if (!this.name) {
      this.snackBar.open('Please add a reason for rejection', 'OK', { duration: 3000 })
      return
    }
    this.close()
  }

}
