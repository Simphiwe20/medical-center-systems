import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent {
  hide = true;
  resetPasswordForm: FormGroup

  constructor(private dialogRef: MatDialog, private snackbar: MatSnackBar) {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  changePassword() {
    if (this.resetPasswordForm.get('newPassword')?.value !== this.resetPasswordForm.get('confirmPassword')?.value) {
      this.snackbar.open('Password do not match', 'OK', { duration: 3000 })
      console.log(this.resetPasswordForm)
      console.log(this.resetPasswordForm.get('newPassword')?.value, this.resetPasswordForm.get('confirmPssword')?.value)
    } else {
      this.snackbar.open('Password changed successfully..!', 'OK', { duration: 3000 })
    }
  }
  close() {
    this.dialogRef.closeAll()
  }
}

