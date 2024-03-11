import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAvailComponent } from '../Popups/add-avail/add-avail.component';
import { DatePickerComponent } from '../Popups/date-picker/date-picker.component';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

   users:any;
  _days = localStorage.getItem('days')
  days: any = !this._days ? [{day:'Sunday', avail: false, unavail: false, startTime:'', endTime:''}, {day:'Monday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, 
  {day:'Wednesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Thursday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Friday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Sartuday', avail: false,  unavail: false, startTime:'', endTime:''}] : JSON.parse(this._days)
  newDays: any;
  snackBar: any;
  saveToDb(){
    this.api.genericPost('/user', this.users)
      .subscribe({
        next: (res: any) => {
          // sessionStorage.setItem('currentUser', JSON.stringify(res));
          this.users.reset();
          console.log(res)
        },
        error: (err: any) => this.snackBar.open(err.error, 'Ok', { duration: 3000 }),
        complete: () => { }
      })
  }

  constructor(private matdialog: MatDialog,private user:UserInfoService,private api:ApiServiceService) {
    const times = JSON.parse(localStorage.getItem('schedules') || '[]')
    const ava = JSON.parse(localStorage.getItem('days') || '[]')
    this.users = this.user.get('currentUser',"session")
    this.saveToDb()
   
    console.log(ava.filter((weekday:any) => {
      return weekday.day === 'Tuesday';
  }));

  console.log(times.find((time:any) => {
    return time.start_date
  }))

  }
  userDetails(){
    console.log(this.users)
  }

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
