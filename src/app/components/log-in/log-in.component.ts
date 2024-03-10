import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule, Form } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  loginForm: FormGroup;
  user: any;

  constructor(private sharedService: UserInfoService, private router: Router, private snackBar: MatSnackBar) {


    this.user = this.sharedService.get('users', 'local')
    if (!this.user) {
      this.sharedService.store([{
        fullName: 'Built-In Admin',
        email: 'admin@medicalcenter.ac.za',
        role: 'admin',
        phoneNumber: null,
        address: null,
        password: 'admin@12'
      }], 'users', 'local')
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),

    })
  }

  submit(): void {
    // Fetch all users
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : [];

    if (this.loginForm.valid) {
      // Check if user exists
      const foundUser = users.find((user: any) => user.email === this.loginForm.controls["email"].value);

      this.sharedService.currentUser = '';

      if (!foundUser) {
        this.snackBar.open('User does not exist.', 'OK');
      } else if (foundUser.password !== this.loginForm.controls['password'].value) {
        this.snackBar.open('Password incorrect', 'OK');
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
        this.router.navigate(['/home'])

      }
    }
  }
  resetForm() {
    this.loginForm.reset();
  }
}

