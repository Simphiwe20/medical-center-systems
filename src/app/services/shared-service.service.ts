import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  availDoc: any;

  days: any = [{ day: 'Sunday', startTime: '', endTime: '' }, { day: 'Monday', startTime: '', endTime: '' }, { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' }, { day: 'Thursday', startTime: '', endTime: '' }, { day: 'Friday', startTime: '', endTime: '' }, { day: 'Sartuday', startTime: '', endTime: '' }]

  constructor() { }

  
  avalaibility(availDays: any, days: any[]) {
    availDays.forEach((_day: any, indx: number) => {
      if (new Date(_day.date).getTime() < new Date().getTime()) return

      days.forEach((availDay: any) => {
        if (availDay.day === _day.day) {
          availDay.startTime = _day.hours.startTime
          availDay.endTime = _day.hours.endTime
        }
      })
      console.log(this.days)
      return this.days

    })
  }

  getAvail(doc: any): any {
    this.availDoc =  doc
  }

  getMonth(): any {
    switch(new Date().getMonth()) {
      case 0:
        return 'January'
      case 1:
        return 'February'
      case 2:
        return 'March'
      case 3:
        return 'April'
      case 4:
        return 'May'
      case 5:
        return 'June'
      case 6:
        return 'July'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
          return 'October'
      case 10:
          return 'November'
      case 11:
          return 'December'
      
    }
  }
}
