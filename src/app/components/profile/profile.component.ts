import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ChangePwdComponent } from '../Popups/change-pwd/change-pwd.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user:any



  constructor(private service:UserInfoService, private matDialog: MatDialog) {
    this.user = this.service.get('currentUser','session')
  }

  changePwd() {
    this.matDialog.open(ChangePwdComponent)
  }

  }