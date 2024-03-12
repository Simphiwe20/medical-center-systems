import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  getDay(dayNum: number) {
    switch (dayNum) {
      case 0:
        return 'Sunday'
        break;
      case 1:
        return 'Monday'
        break;
      case 2:
        return 'Tuesday'
        break
      case 4:
        return 'Wednesday'
        break
      case 5:
        return 'Thursday'
        break
      case 6:
        return 'Friday'
        break
      default:
          return 'Sunday'
          break
    } 

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
