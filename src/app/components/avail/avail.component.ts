import { Component } from '@angular/core';
import { DatePickerComponent } from '../Popups/date-picker/date-picker.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-avail',
  templateUrl: './avail.component.html',
  styleUrls: ['./avail.component.scss']
})
export class AvailComponent {

  availDays: any;
  days: any = [{day:'Sunday', startTime:'', endTime:''}, {day:'Monday', startTime:'', endTime:''}, {day:'Tuesday', startTime:'', endTime:''}, 
  {day:'Wednesday', startTime:'', endTime:''}, {day:'Tuesday', startTime:'', endTime:''}, {day:'Friday', startTime:'', endTime:''}, {day:'Sartuday', startTime:'', endTime:''}]
  newDays: any;

  constructor(private matdialog: MatDialog) {
    this.availDays =  localStorage.getItem('availDays')
    this.availDays = this.availDays ? JSON.parse(this.availDays) : []
    // this.availDays.forEach((day: any, indx: number) => {
    //   if(this.days[indx] === day.date) {

    //   }
    // })
  }

  openDialog() {
    let dialogRef = this.matdialog.open(DatePickerComponent)
   
    // dialogRef.afterClosed().subscribe( {
    //   next: (res) => {
    //     this.days.forEach((day: any, indx: number) => {
    //       day.avail = res.data[indx].avail
    //       day.unavail = res.data[indx].unavail
    //       day.startTime = res.data[indx].startTime
    //       day.endTime = res.data[indx].endTime
    //     })
    //     localStorage.setItem('days', JSON.stringify(this.days))
    //   },       
    //   error: () => {},
    //   complete: () => {}
    // })

    dialogRef.afterClosed()
    .subscribe({
      next: (res) => {console.log(res)},
      error: (err) => console.log(err),
      complete: () => {} 
    })

   
  }
}
