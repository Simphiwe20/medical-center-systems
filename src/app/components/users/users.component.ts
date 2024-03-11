import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userTable: any;

  constructor(private localData:UserInfoService) {
    this.userTable =
    {
      title: '',
      dataSource: this.localData.get('users','local'),
      displayedColumns: ['fullName', 'email', 'identityNO', 'gender', 'role', 'contact'],
      displayedHeaders: ['Full Names', 'email', 'ID number', 'Gender', 'Role', 'contact']
    }
  }



}
