import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddPatientComponent } from './components/Popups/add-patient/add-patient.component';
import { rejectReasonComponent } from './components/Popups/rejectReason/rejectReason.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { BarGraphComponent } from './components/charts/bar-graph/bar-graph.component';
import { PieChartsComponent } from './components/charts/pie-charts/pie-charts.component';
import { ChangePwdComponent } from './components/Popups/change-pwd/change-pwd.component';
import { PatientComponent } from './components/patient/patient.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/materials/material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TableComponent } from './components/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { DetailsComponent } from './components/Popups/details/details.component';
import { AvailComponent } from './components/avail/avail.component';
import { DatePickerComponent } from './components/Popups/date-picker/date-picker.component';
import { AddAvailComponent } from './components/Popups/add-avail/add-avail.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeComponent } from './components/Popups/time/time.component';
import { TodayTableComponent } from './components/Popups/today-table/today-table.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmComponent } from './components/Popups/confirm/confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    DashboardComponent,
    AddPatientComponent,
    UsersComponent,
    ProfileComponent,
    SchedulesComponent,
    BarGraphComponent,
    PieChartsComponent,
    ChangePwdComponent,
    PatientComponent,
    FooterComponent,
    ForgotPasswordComponent,
    DoctorsComponent,
    TableComponent,
    DetailsComponent,
    AvailComponent,
    DatePickerComponent,
    AddAvailComponent,
    rejectReasonComponent,
    TimeComponent,
    TodayTableComponent,
    PageNotFoundComponent,
    ConfirmComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
