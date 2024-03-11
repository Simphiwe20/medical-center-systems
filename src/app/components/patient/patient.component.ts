import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  patientTable: any;

  constructor(){
    this.patientTable = 
      {
        title: 'Patient',
        dataSource: [
          { id: 1, fullName: 'Patient 1', gender: 'Female',email: 'dd@ww', identityNO: '858454 4545 014'  ,bloodGroup:'O+',contact:'01454575855'},
          { id: 2, fullName: 'Patient 2', gender: 'Female',email: 'dhg@dsd', identityNO: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 3, fullName: 'Patient 3', gender: 'Female',email: 'hdg@dad', identityNO: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 4, fullName: 'Patient 4', gender: 'Female',email: 'dgg@ed', identityNO: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 5, fullName: 'Patient 5', gender: 'Female',email: 'dgg@sdd', identityNO: '858454 4545 014',bloodGroup:'O+',contact:'01454575855' },
          { id: 1, fullName: 'Patient 1', gender: 'Female',email: 'dd@ww', identityNO: '858454 4545 014'  ,bloodGroup:'O+',contact:'01454575855'},
          { id: 2, fullName: 'Patient 2', gender: 'Female',email: 'dhg@dsd', identityNO: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 3, fullName: 'Patient 3', gender: 'Female',email: 'hdg@dad', identityNO: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 4, fullName: 'Patient 4', gender: 'Female',email: 'dgg@ed', identityNO: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 5, fullName: 'Patient 5', gender: 'Female',email: 'dgg@sdd', identityNO: '858454 4545 014',bloodGroup:'O+',contact:'01454575855' }
        ],
        displayedColumns: ['fullName', 'email', 'identityNO','gender','bloodGroup','contact'],
        displayedHeaders: ['Full Names', 'email', 'ID number','Gender','Blood Group','contact']
      }
  }



}
