import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPatientComponent } from '../Popups/add-patient/add-patient.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(private dialogRef:MatDialog){

  }
  openDialog() {
    this.dialogRef.open(AddPatientComponent)
  }
}
