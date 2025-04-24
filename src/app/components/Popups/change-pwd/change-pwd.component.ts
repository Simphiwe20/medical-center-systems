import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})

export class ChangePwdComponent {

  changePwdForm: FormGroup
  user: any
  users: any

  constructor(private userInfor: UserInfoService, private snackBar: MatSnackBar, private matDialogRef: MatDialogRef<ChangePwdComponent>,
    private apiService: ApiServiceService
  ) {
    this.user = this.userInfor.get('currentUser', 'session')

    this.changePwdForm = new FormGroup({
      currentPwd: new FormControl('', [Validators.required]),
      newPwd: new FormControl('', [Validators.required]),
      confirmPwd: new FormControl('', [Validators.required])
    })
  }

  save() {
    let currentPassword = this.user.password

    if (currentPassword !== this.changePwdForm['controls']['currentPwd'].value) {
      this.snackBar.open('Your current password is incorrect', 'OK', { duration: 3000 })
    } else {
      if (this.changePwdForm['controls']['confirmPwd'].value === this.changePwdForm['controls']['newPwd'].value) {
        this.user.password = this.changePwdForm['controls']['confirmPwd'].value
        this.apiService.genericUpdate('/update-user', this.user)
          .subscribe({
            next: (res) => {
              this.close()
              this.snackBar.open('Your password, hass been changed successfully', 'OK', { duration: 3000 })
            },
            error: (err) => {
              this.close()
              this.snackBar.open(err.error.message, 'OK', { duration: 3000 })
            },
            complete: () => { }
          })


      } else {
        this.snackBar.open('New password and confirm password doesn\'t match', 'OK', { duration: 3000 })
      }
    }

  }


  close() {
    this.matDialogRef.close()
  }
}
