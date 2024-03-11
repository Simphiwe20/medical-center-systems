import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/services/user-info.service';

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
  isReceptionist: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private matdialogRef: MatDialogRef<DetailsComponent>, private snackbar: MatSnackBar, private localDetails: UserInfoService) {
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
    if (currentUser.role === 'receptionist') {
      this.isReceptionist = true
    }
  }
  details: any = this.data
  localPatients = this.localDetails.get('patients', 'local')
  localData = this.localDetails.get('users', 'local');
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
    localStorage.setItem('prescriptions', JSON.stringify(this.prescriptions))
    // Convert the document content to a Blob
    const blob = new Blob([documentContent], { type: 'file' });

    // Save the Blob using FileSaver.js
    saveAs(blob, 'document.txt');
    this.snackbar.open("Doctor's prescription downloaded succesfully", "OK");
    this.matdialogRef.close();
  }

  Delete(data: any): void {
    if (this.isReceptionist) {
      this.localPatients = this.localPatients.filter((item: any) => item.id != data.id)
      this.localDetails.store(this.localPatients, 'patients', 'local')
    }
    console.log(data)
    this.localData = this.localData.filter((item: any) => item.email !== data.email)
    console.log(this.localData)
    this.localDetails.store(this.localData, 'users', 'local')
    this.snackbar.open("user has been deleted successfully", "OK")
    this.matdialogRef.close()
  }
  
  edit(received: any) {
    this.matDialog.open(AddPatientComponent, { data: received })
  }
  back(): void {
    this.matDialog.closeAll()
  }


}
