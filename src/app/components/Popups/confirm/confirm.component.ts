import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  confirmForm: FormGroup

  constructor(private matDialogRef: MatDialogRef<ConfirmComponent>) {
    this.confirmForm = new FormGroup({
      confirm: new FormControl('', [Validators.required])
    })
  }

  close() {
    this.matDialogRef.close({data: this.confirmForm.controls['confirm']['value']})
   }

  save() {
    if(!this.confirmForm.controls['confirm']['value']) return
    this.close()
  }
}
