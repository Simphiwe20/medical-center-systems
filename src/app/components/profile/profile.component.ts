import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


  constructor(private service:UserInfoService) {
    this.user = this.service.get('currentUser','session')
  }
  user:any


  }

