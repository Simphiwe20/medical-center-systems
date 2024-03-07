import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { PatientComponent } from './components/patient/patient.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LogInComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'patient', component: PatientComponent},
    {path: 'availability', component: AvailabilityComponent},
  ]},
  {path:'forgotPassword',component:ForgotPasswordComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
