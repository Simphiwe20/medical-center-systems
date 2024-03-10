import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {

  availHours: any = {startTime: '', endTime: ''}

  constructor(private dialogRef: MatDialogRef<TimeComponent>, private snackBar: MatSnackBar) {}
  save(): any {
    if(!this.availHours.startTime || !this.availHours.endTime) {
      this.snackBar.open('Please add both times to avail yourself', 'OK', {duration: 3000})
      return
    }
   this.close()
  }

  close() {
    this.dialogRef.close({data: this.availHours})
  }
}
