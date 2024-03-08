import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-avail',
  templateUrl: './add-avail.component.html',
  styleUrls: ['./add-avail.component.scss']
})
export class AddAvailComponent {

  
  _index: number = 0
  storeDays: any = localStorage.getItem('days')
  isTimeSet: boolean = true

  days: any = !this.storeDays ? [{day:'Sunday', avail: false, unavail: false, startTime:'', endTime:''}, {day:'Monday', avail: false,  unavail: false, startTime:'', endTime:''}, 
  {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Wednesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, 
  {day:'Friday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Sartuday', avail: false,  unavail: false, startTime:'', endTime:''}] : JSON.parse(this.storeDays)

  constructor(private dialogRef: MatDialogRef<AddAvailComponent>, private snackBar: MatSnackBar) {}

  updateAvail(indx: number): void {
    if(!this.days[indx].avail && !this.days[indx].unavail)  {
      this.days[indx].avail = true
      this._index = indx
    }else if (this.days[indx].avail || !this.days[indx].unavail) {
      this.days[indx].unavail = true
      this.days[indx].avail = false
      this._index = indx
    }else {
      this.days[indx].avail = false
      this.days[indx].unavail = false
    }
  }

  save(): any {
    this.days.forEach((day: any, indx: number) => {
      if(day.avail && (!day.startTime || !day.endTime)) {
        this.snackBar.open(`You forgot to set time for ${day.day}'s availability`, 'OK', {duration: 3000})
        this.isTimeSet = false
      }
    })
  if(!this.isTimeSet) return
   this.close()
  }

  close() {
    this.dialogRef.close({data: this.days})
  }
}
