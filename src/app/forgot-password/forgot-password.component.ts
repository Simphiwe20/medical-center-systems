import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule, Form } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/services/user-info.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;

  constructor(private sharedService: UserInfoService, private router: Router, private snackBar: MatSnackBar, private emailService: EmailService) {

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      id: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    })
  }



  sendEmail(form: any): void {
    // Fetch all users
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : [];

    if (this.forgotPasswordForm.valid) {
      // Check if user exists
      const foundUser = users.find((user: any) => user.email === this.forgotPasswordForm.controls["email"].value);

      if (foundUser) {
        if (foundUser.id == this.forgotPasswordForm.controls["id"].value) {
          

          this.emailService.sendEmail(`${foundUser.email}`, 'Test Email', `Password${foundUser.password}`)
            .then(response => {
              console.log('Email sent successfully', response);
              this.snackBar.open("Password has been sent to your email ", "OK")  
              this.router.navigate(["/login"])
            })
            .catch(error => {
              console.error('Error sending email', error);
            })
        }
        else
          this.snackBar.open("ID invalid", "OK")
      } else {
        this.snackBar.open("use not found", "OK")
      }
    }

  }

  resetForm() {
    this.forgotPasswordForm.reset();
  }
}
