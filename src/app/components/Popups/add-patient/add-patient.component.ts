import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html', 
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  bloogDroup: any[] = ['AB+', 'A+', 'B+', 'C+', 'AB', 'A-', 'B-', 'O-']
  _medicalAid: any []=['Yes', 'No']
  patientForm: FormGroup

  constructor(private dialogRef: MatDialog, private snackbar: MatSnackBar) {
    this.patientForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      id: new FormControl(Number, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      symptoms: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dob: new FormControl(false, [Validators.required]),
      blood: new FormControl('', [Validators.required]),
      medicalAid: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  genders: any[] = [
    { value: 'male-0', viewValue: 'male' },
    { value: 'female-1', viewValue: 'female' },
  ];

  save() {
    localStorage.setItem('patients', JSON.stringify(this.patientForm.value))
    // let _patientDetails = localStorage.getItem('patients');
    const patient = JSON.parse(this.patientForm.value) || []
    console.log(patient)

    if (this.patientForm.valid == true) {
      const foundPatient = patient.find((patient: any) => patient.email === this.patientForm.controls['email'].value);
      this.snackbar.open('Patient already exist')
    } else {

      patient.push(this.patientForm.value);
      localStorage.setItem('Patient', JSON.stringify(patient))
      this.snackbar.open('Patient added succesfully')

    }
  }

  close() {
    this.patientForm.reset()
    this.dialogRef.closeAll()
  }
}


