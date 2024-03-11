import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddAvailComponent } from '../add-avail/add-avail.component';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  selected!: Date;
  availDates: any;
  doctorDays: any;
  currentDate: Date;
  user: any;

  constructor(private dialogRef: MatDialogRef<DatePickerComponent>, private matDialog: MatDialog) {
    this.dialogRef.disableClose = true
    this.availDates = localStorage.getItem('availDays')
    this.availDates = this.availDates ? JSON.parse(this.availDates) : []
    this.currentDate = new Date()
    this.user = sessionStorage.getItem('currentUser')
    this.user = JSON.parse(this.user)

  }

  close() {
    if (this.selected) {
      this.dialogRef.close(this.selected)
      console.log(this.selected)
    } else {
      this.dialogRef.close()
      console.log(this.selected)
    }
  }

  openTime() {
    let dialogRef = this.matDialog.open(AddAvailComponent)
    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          console.log(res)
          if(res.data.startTime && res.data.endTime) {
            this.availDates.push({
            date: this.selected,
            day: this.getDay(this.selected.getDay()),
            hours: res.data,
            doctorName: this.user.firstName + ' ' + this.user.lastName,
            doctorEmail: this.user.email,
            availID: `avail-${Math.floor(Math.random() * (200 - 100 + 1) + 100)}`
          })
          }
          
          console.log(this.availDates)
          localStorage.setItem('availDays', JSON.stringify(this.availDates))
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      })
  }

  getDay(day: number): any {
    switch (day) {
      case 0:
        return 'Sunday'
        break
      case 1:
        return 'Monday'
        break
      case 2:
        return 'Tuesday'
        break
      case 3:
        return 'Wednesday'
        break
      case 4:
        return 'Thursday'
        break
      case 5:
        return 'Friday'
        break
      case 6:
        return 'Sartuday'
        break

    }
  }

  myfilter = (d: Date): Date => {
    const day = d.getDay();
    return new Date()
  }

}
