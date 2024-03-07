import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../Popups/add-patient/add-patient.component';
import { ChangePwdComponent } from '../Popups/change-pwd/change-pwd.component';
import { PrescriptionComponent } from '../Popups/prescription/prescription.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private dialog:MatDialog){
  }

  
}
