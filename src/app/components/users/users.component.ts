import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  userTable: any;
  users: any

  constructor(private localData: UserInfoService, private api: ApiServiceService) {
  }



  ngOnInit(): void {
    this.api.genericGet("/users").subscribe({
      next: (res) => {
        this.users = res
        console.log("res: ", res)
      },
      error: (err) => { console.log("ERR: ", err) },
      complete: () => { }
    })

    setTimeout(() => {
      this.userTable =
      {
        title: '',
        dataSource: this.users,
        displayedColumns: ['fullName', 'email', 'identityNO', 'gender', 'role', 'contact'],
        displayedHeaders: ['Full Names', 'Email', 'ID number', 'Gender', 'Role', 'Contact']
      }
    }, 350);
  }




}
