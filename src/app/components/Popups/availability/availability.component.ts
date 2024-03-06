import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})

export class AvailabilityComponent {

  _index: number = 0

  days: any[] = [{day:'Sunday', avail: false, unavail: false, startTime:'', endTime:''}, {day:'Monday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, 
  {day:'Wednesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Tuesday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Friday', avail: false,  unavail: false, startTime:'', endTime:''}, {day:'Sartuday', avail: false,  unavail: false, startTime:'', endTime:''}]

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
}

