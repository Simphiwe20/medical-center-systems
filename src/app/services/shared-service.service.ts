import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

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
}
