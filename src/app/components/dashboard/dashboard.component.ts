import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/services/user-info.service';
import { SchedulesComponent } from '../schedules/schedules.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    availDays: any;
    user: any;
    today: any;

    constructor(private userService: UserInfoService, private dialog:MatDialog, private shared: SharedServiceService) {
      this.availDays =this.userService.get('availDays', 'local')
      console.log(this.availDays)
      this.user = sessionStorage.getItem('currentUser')
      this.user = JSON.parse(this.user)
      // this.today = this.userService.get('schedule')


    }

    open(){
      this.dialog.open(SchedulesComponent,{
        width: '80vw',
      maxWidth: '100vw',}) 
    }

    getUser(doc: any): any {
      this.shared.getAvail(doc)
    } 
}
