import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  addPatient: FormGroup;
  disableSelect = new FormControl(false);
  medicalAid: { option: string } = { option: 'No' }
  patients: any = [];
  isUpdate: boolean = false;

  constructor(private shared: UserInfoService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private matdialoRef:MatDialogRef<AddPatientComponent>,private matdialog:MatDialog) {

    this.addPatient = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      identityNO: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      medicalAid: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      cardNO: new FormControl('', [Validators.required]),
      medicalAidNO: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      id: new FormControl(''),
      bloodGroup: new FormControl('', [Validators.required])
    })
    if (data) {
      this.isUpdate = true;
      this.addPatient.patchValue(data)
      console.log("polulation", this.addPatient)
    }

  }

  submit() {

    let existingPatients: any[] = this.shared.get('patients', 'local');
    console.log(existingPatients);
    if (existingPatients) {
      existingPatients = existingPatients.map((element: any) => {
        if (this.addPatient.value.email === element.email) {
          console.log("user exist")
          this.snackbar.open("patient already exist", 'OK')
          // return this.policyFormData;
        } else {
          this.patients.push({ ...this.addPatient.value, id: new Date().getTime() })
          this.shared.store(this.patients, 'patients', 'local')
        }

      })
    }
    else {
      this.patients.push({ ...this.addPatient.value, id: new Date().getTime() })
      this.shared.store(this.patients, 'patients', 'local')

    }

  }
  update(): void {
    let existingPatients: any[] = this.shared.get('patients', 'local');
    existingPatients.forEach(((patient: any) => {
      
      if (patient.id === this.data.id) {
        console.log(patient.email +"&"+ this.addPatient.value.email)
        patient.email = this.addPatient.value.email
        patient.fullName = this.addPatient.value.fullName
        this.shared.store(existingPatients, 'patients', 'local')
      }
    }))
    this.snackbar.open("patient updated successfully", 'OK')
    this.matdialog.closeAll()
    this.matdialoRef.close()

  }

}
