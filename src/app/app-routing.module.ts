import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { PatientComponent } from './components/patient/patient.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AvailComponent } from './components/avail/avail.component';
import { ReceptionDashboardComponent } from './dashboards/reception-dashboard/reception-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DoctorDashboardComponent } from './dashboards/doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LogInComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'schedules', component: SchedulesComponent},
    {path: 'patient', component: PatientComponent},
    {path: 'doctors', component: DoctorsComponent},
    {path: 'schedule', component: SchedulesComponent},
    {path: 'patient', component: PatientComponent},
    {path: 'availability', component: AvailComponent},
    // {path:'dashboards/doctorDashboard', component:DoctorDashboardComponent},
    // {path:'dashboards/receptionDasboard,',component:ReceptionDashboardComponent}
  ]},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path: '**',component:PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
