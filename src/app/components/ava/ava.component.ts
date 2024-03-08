import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerComponent } from '../Popups/datepicker/datepicker.component';

@Component({
  selector: 'app-ava',
  templateUrl: './ava.component.html',
  styleUrls: ['./ava.component.scss']
})
export class AvaComponent {

  
  _days = localStorage.getItem('days')
  days: any = !this._days ? [{day:'Sunday', avail: false, unavail: false, startTime:'', endTime:''}, {day:'Monday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, 
  {day:'Wednesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Thursday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Friday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Sartuday', avail: false,  unavail: false, startTime:'', endTime:''}] : JSON.parse(this._days)
  newDays: any;

  constructor(private matdialog: MatDialog) {
    const times = JSON.parse(localStorage.getItem('schedules') || '[]')
    const ava = JSON.parse(localStorage.getItem('days') || '[]')
   
    console.log(ava.filter((weekday:any) => {
      return weekday.day === 'Tuesday';
  }));

  console.log(times.find((time:any) => {
    return time.start_date
  }))

  }

  openDialog() {
    let dialogRef = this.matdialog.open(DatepickerComponent)
   
    dialogRef.afterClosed().subscribe( {
      next: (res) => {console.log(res)},       
      error: () => {},
      complete: () => {}
    })
  }

}
