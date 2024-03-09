import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/services/user-info.service';
import { SchedulesComponent } from '../schedules/schedules.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    availDays: any;

    constructor(private userService: UserInfoService, private dialog:MatDialog) {
      this.availDays =this.userService.get('availDays', 'local')
      console.log(this.availDays)
    }

    open(){
      this.dialog.open(SchedulesComponent,{
        width: '80vw',
      maxWidth: '100vw',})
      
    }
}
