import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAvailComponent } from '../Popups/add-avail/add-avail.component';
import { DatePickerComponent } from '../Popups/date-picker/date-picker.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  _days = localStorage.getItem('days')
  days: any = !this._days ? [{day:'Sunday', avail: false, unavail: false, startTime:'', endTime:''}, {day:'Monday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, 
  {day:'Wednesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Friday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Sartuday', avail: false,  unavail: false, startTime:'', endTime:''}] : JSON.parse(this._days)
  newDays: any;

  constructor(private matdialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.matdialog.open(DatePickerComponent)
   
    dialogRef.afterClosed().subscribe( {
      next: (res) => {
        this.days.forEach((day: any, indx: number) => {
          day.avail = res.data[indx].avail
          day.unavail = res.data[indx].unavail
          day.startTime = res.data[indx].startTime
          day.endTime = res.data[indx].endTime
        })
        localStorage.setItem('days', JSON.stringify(this.days))
      },       
      error: () => {},
      complete: () => {}
    })

   
  }
}
