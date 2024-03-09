import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    availDays: any;

    constructor(private userService: UserInfoService) {
      this.availDays =this.userService.get('availDays', 'local')
      console.log(this.availDays)
    }
}
