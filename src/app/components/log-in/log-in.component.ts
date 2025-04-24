import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule, Form } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  loginForm: FormGroup;
  user: any;
  users: any;

  constructor(private sharedService: UserInfoService, private router: Router, private snackBar: MatSnackBar,
    private apiService: ApiServiceService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)])
    })


  }

  submit(): void {
    if (this.loginForm.valid) {
      this.apiService.genericPost('/sign-in', this.loginForm['value'])
        .subscribe({
          next: (res: any) => {
            sessionStorage.setItem('currentUser', JSON.stringify(res));
            this.router.navigate(['/home'])
          },
          error: (err) => {
            console.log('ERROR: ', err)
            this.snackBar.open(err.error.message, 'OK', { duration: 3000 })
          },
          complete: () => { }
        })
    }
  }

  resetForm() {
    this.loginForm.reset();
  }
}

