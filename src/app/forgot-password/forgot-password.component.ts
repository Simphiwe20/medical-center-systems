import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule, Form } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;

  constructor(private sharedService: UserInfoService, private router: Router, private snackBar: MatSnackBar) {

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
    })
  }

  submit(): void {
    // Fetch all users
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : [];

    if(this.forgotPasswordForm.valid)
    {
       // Check if user exists
       const foundUser = users.find((user: any) => user.email === this.forgotPasswordForm.controls["email"].value);

      if(foundUser){
        console.log("use was found")
      } else{
        console.log("use not found")
      }
    }
  }


  resetForm() {
    this.forgotPasswordForm.reset();
  }
}
