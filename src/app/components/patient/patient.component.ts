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
          { id: 1, name: 'Patient 1', gender: 'Female',email: 'dd@ww', idNumber: '858454 4545 014'  ,bloodGroup:'O+',contact:'01454575855'},
          { id: 2, name: 'Patient 2', gender: 'Female',email: 'dhg@dsd', idNumber: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 3, name: 'Patient 3', gender: 'Female',email: 'hdg@dad', idNumber: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 4, name: 'Patient 4', gender: 'Female',email: 'dgg@ed', idNumber: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 5, name: 'Patient 5', gender: 'Female',email: 'dgg@sdd', idNumber: '858454 4545 014',bloodGroup:'O+',contact:'01454575855' },
          { id: 1, name: 'Patient 1', gender: 'Female',email: 'dd@ww', idNumber: '858454 4545 014'  ,bloodGroup:'O+',contact:'01454575855'},
          { id: 2, name: 'Patient 2', gender: 'Female',email: 'dhg@dsd', idNumber: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 3, name: 'Patient 3', gender: 'Female',email: 'hdg@dad', idNumber: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 4, name: 'Patient 4', gender: 'Female',email: 'dgg@ed', idNumber: '858454 4545 014' ,bloodGroup:'O+',contact:'01454575855'},
          { id: 5, name: 'Patient 5', gender: 'Female',email: 'dgg@sdd', idNumber: '858454 4545 014',bloodGroup:'O+',contact:'01454575855' }
        ],
        displayedColumns: ['name', 'email', 'idNumber','gender','bloodGroup','contact'],
        displayedHeaders: ['Full Names', 'email', 'ID number','Gender','Blood Group','contact']
      }
  }



}
