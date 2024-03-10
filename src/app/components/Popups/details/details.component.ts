import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']

})
export class DetailsComponent {
  prescriptions: any = [];
  doctorName!: string;
  doctorEmail!: string;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private matdialogRef: MatDialogRef<DetailsComponent>, private snackbar: MatSnackBar) {
    let _usersD = sessionStorage.getItem('currentUser');
    const currentUser = _usersD ? JSON.parse(_usersD) : [];

    this.doctorName = currentUser.firstName + ' ' + currentUser.lastName;
    this.doctorEmail = currentUser.email
    console.log(currentUser.role)

    if (currentUser.role === 'doctor') {
      this.isDoctor = true;

    }
    if (currentUser.role === 'admin') {
      this.isAdmin = true
    }
  }
  details: any = this.data
  PrescriptionFormdata: any = {

  }

  saveDocument(received: any) {
    // Assuming documentContent is the content of your document
    const documentContent = `
    Doctor name : ${this.doctorName}

    Doctor email : ${this.doctorEmail}

    Date : ${new Date().toString().slice(4, 15)}

    time : ${new Date().toString().slice(16, 21)}

    Patient name : ${this.details.fullName} 

    Patient Id : ${this.details.id}

    patient IDENTITY NUMBER : ${this.details.identityNO}
    
    Doctor's prescription : ${this.PrescriptionFormdata.prescription}
    
    `;
    let patientPrescriptions = {
      doctorName: this.doctorName,
      date: new Date().toString().slice(4, 15),
      time: new Date().toString().slice(16, 21),
      patientName: this.details.fullName,
      pentientId: this.details.identityNO,
      doctorPrescription: this.PrescriptionFormdata.prescription
    }

    // save description to local storage/database
    this.prescriptions.push(patientPrescriptions)
    console.log(this.prescriptions)
    localStorage.setItem('prescriptions',JSON.stringify(this.prescriptions))
    // Convert the document content to a Blob
    const blob = new Blob([documentContent], { type: 'file' });

    // Save the Blob using FileSaver.js
    saveAs(blob, 'document.txt');
    this.snackbar.open("Doctor's prescription downloaded succesfully", "OK");
    this.matdialogRef.close();
  }

  delete(): void {

  }
  edit(received: any) {
    this.matDialog.open(AddPatientComponent, { data: received })
  }
  back(): void {
    this.matDialog.closeAll()
  }


}
