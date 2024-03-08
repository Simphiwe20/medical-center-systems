import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  selected!: Date | null;
  availDates: any[] = []
  doctorDays: any;

  constructor(private dialogRef: MatDialogRef<DatepickerComponent>, private matDialog: MatDialog) { 

    this.doctorDays = localStorage.getItem('availDays')
    this.doctorDays = this.doctorDays ? JSON.parse(this.doctorDays) : []
  }

  close() {
    if (this.selected) {
      this.dialogRef.close(this.selected)
      console.log(this.selected)
    }else {
      this.dialogRef.close()
      console.log(this.selected)
    }
  }

  openTime() {
    let dialogRef = this.matDialog.open(TimeComponent)
    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.availDates.push({
            date: this.selected,
            hours: res.data
          })
          console.log(this.availDates)
        this.doctorDays.push(this.availDates)
        localStorage.setItem('availDays', JSON.stringify(this.availDates))
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })
  }


}
