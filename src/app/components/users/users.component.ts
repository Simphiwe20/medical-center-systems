import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userTable: any;

  constructor() {
    this.userTable =
    {
      title: '',
      dataSource: [
        { id: 1, name: 'User 1', gender: 'Female', email: 'kk@kk.com', idNumber: '981508 2254 087', bloodGroup: 'O+', contact: '01454575855' },
        { id: 2, name: 'User 2', gender: 'Female', email: 'jj@ss.com', idNumber: '981508 2254 087', bloodGroup: 'O+', contact: '01454575855' },
        { id: 3, name: 'User 3', gender: 'Female', email: 'll@ss.com', idNumber: '981508 2254 087', bloodGroup: 'O+', contact: '01454575855' },
        { id: 4, name: 'User 4', gender: 'Female', email: 'mm@yy.com', idNumber: '981508 2254 087', bloodGroup: 'O+', contact: '01454575855' },
        { id: 5, name: 'User 5', gender: 'Female', email: 'qq@cc.com', idNumber: '981508 2254 087', bloodGroup: 'O+', contact: '01454575855' }
      ],
      displayedColumns: ['name', 'email', 'idNumber', 'gender', 'bloodGroup', 'contact'],
      displayedHeaders: ['Full Names', 'email', 'ID number', 'Gender', 'Blood Group', 'contact']
    }
  }



}
