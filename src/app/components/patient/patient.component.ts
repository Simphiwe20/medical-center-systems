import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  patientTable: any;

  constructor(private shared:UserInfoService ){
    this.patientTable = 
      {
        title: 'Patient',
        dataSource:this.shared.get('patients','local'),
        displayedColumns: ['fullName', 'email', 'identityNO','gender','bloodGroup','contact'],
        displayedHeaders: ['Full Names', 'Email', 'ID number','Gender','Blood Group','Contact']
      }
  }



}
