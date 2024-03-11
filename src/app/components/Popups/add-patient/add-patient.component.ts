import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { json } from 'express';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  bloogDroup: any[] = ['AB+', 'A+', 'B+', 'C+', 'AB', 'A-', 'B-', 'O-']
  _medicalAid: any[] = ['Yes', 'No']
  gender:any[]=['male','femal']
  patientData: any[] = []
  patientForm: FormGroup

  constructor(private dialogRef: MatDialog, private snackbar: MatSnackBar) {
    this.patientForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      id: new FormControl(Number, [Validators.required, Validators.minLength(13), Validators.minLength(13)]),
      symptoms: new FormControl('' ),
      address: new FormControl('', [Validators.required]),
      dob: new FormControl(false, [Validators.required]),
      blood: new FormControl(''),
      medicalAid: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  genders: any[] = [
    { value: 'male-0', viewValue: 'male' },
    { value: 'female-1', viewValue: 'female' },
  ];

  save() {
    let savedValue = localStorage.setItem('patient', JSON.stringify(this.patientForm.value))
    let _users = localStorage.getItem('patient');
    const users = _users ? JSON.parse(_users) : [];


    localStorage.setItem('patient', JSON.stringify(users))

    this.dialogRef.closeAll()

  }
  resetForm() {
    this.dialogRef.closeAll();
  }
}

