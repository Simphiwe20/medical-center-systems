import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddPatientComponent } from './components/Popups/add-patient/add-patient.component';
import { PrescriptionComponent } from './components/Popups/prescription/prescription.component';
import { AvailabilityComponent } from './components/Popups/availability/availability.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { BarGraphComponent } from './components/charts/bar-graph/bar-graph.component';
import { PieChartsComponent } from './components/charts/pie-charts/pie-charts.component';
import { ChangePwdComponent } from './components/Popups/change-pwd/change-pwd.component';
import { PatientComponent } from './components/patient/patient.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MaterialModule } from './modules/materials/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    DashboardComponent,
    AddPatientComponent,
    PrescriptionComponent,
    AvailabilityComponent,
    UsersComponent,
    ProfileComponent,
    SchedulesComponent,
    BarGraphComponent,
    PieChartsComponent,
    ChangePwdComponent,
    PatientComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
