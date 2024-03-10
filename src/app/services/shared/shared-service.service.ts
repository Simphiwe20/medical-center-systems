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

}
