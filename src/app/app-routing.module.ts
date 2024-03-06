import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { PatientComponent } from './components/patient/patient.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent},
    {path: 'users', component: UsersComponent},
    {path: 'schedules', component: SchedulesComponent},
    {path: 'patient', component: PatientComponent}
  ]},
  {path: 'login', component: LogInComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
