import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
addPatient: FormGroup;
disableSelect = new FormControl(false);
medicalAid: { option: string } = { option: 'No' }

constructor(){
  this.addPatient = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
    fullName: new FormControl('',[Validators.required]),
    Gender: new FormControl('',[Validators.required]),
    IdNumber: new FormControl('',[Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    medicalAid: new FormControl('',[Validators.required]),
    DOB: new FormControl('',[Validators.required]),
    Bank: new FormControl('',[Validators.required]),
    medAid: new FormControl('',[Validators.required]),
    medNo: new FormControl('',[Validators.required])
  })
}
}

