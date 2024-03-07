import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  bloogDroup: any[] = ['AB+', 'A+', 'B+', 'C+', 'AB', 'A-', 'B-', 'O-']
  patientForm: FormGroup

  constructor(private dialogRef: MatDialog) {
    this.patientForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required]),
      cellNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      symptoms: new FormControl('', [Validators.required]),
      dob: new FormControl(false, [Validators.required]),
      blood: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }
  save() {
    console.log(this.patientForm)

  }
  close() {
    this.dialogRef.closeAll()
  }
}
