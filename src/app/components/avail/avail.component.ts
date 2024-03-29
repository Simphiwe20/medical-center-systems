import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent } from '../Popups/date-picker/date-picker.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { scheduled } from 'rxjs';
import { rejectReasonComponent } from '../Popups/rejectReason/rejectReason.component';
import { EmailService } from 'src/app/services/email.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { TimeComponent } from '../Popups/time/time.component';
import { Schedule } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-avail',
  templateUrl: './avail.component.html',
  styleUrls: ['./avail.component.scss']
})
export class AvailComponent {

  displayedColumns: string[] = ['name', 'date', 'startTime', 'endTime', 'action'];
  dataSource!: MatTableDataSource<[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rejectedSchedule: any;
  approvedSchedules: any[] = []
  docSchedule: any;
  availDays: any;
  days: any = [{ day: 'Sunday', startTime: '', endTime: '' }, { day: 'Monday', startTime: '', endTime: '' }, { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' }, { day: 'Thursday', startTime: '', endTime: '' }, { day: 'Friday', startTime: '', endTime: '' }, { day: 'Sartuday', startTime: '', endTime: '' }]
  newDays: any;
  user: any;
  pendingSchedule: any


  constructor(private userInfor: UserInfoService, private matdialog: MatDialog, private api: ApiServiceService,
    private sharedService: SharedServiceService, private emailServ: EmailService) {


    this.docSchedule = this.userInfor.get('schedules', 'local')

    this.user = this.userInfor.get('currentUser', 'session')

    this.availDays = this.userInfor.get('availDays', 'local').filter((day: any) => day.doctorEmail === this.user.email)

    this.sharedService.avalaibility(this.availDays, this.days)
    console.log(this.days)

    this.updateSchedule()

  }

  updateSchedule() {
    this.pendingSchedule = this.userInfor.get('schedules', 'local')
    this.pendingSchedule = this.pendingSchedule.filter((schedule: any) => schedule.doctorEmail === this.user.email && schedule.status === 'Pending')

    console.log(this.pendingSchedule)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.pendingSchedule);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    let dialogRef = this.matdialog.open(DatePickerComponent)

    dialogRef.afterClosed()
      .subscribe({
        next: (res) => { },
        error: (err) => console.log(err),
        complete: () => { }

      })
  }

  approveApp(el: any) {

    this.api.genericPost('/approvedFeedBack', el)
      .subscribe({
        next: (res) => { console.log(res) },
        error: (err) => console.log(err),
        complete: () => { }
      })


    this.docSchedule.forEach((schedule: any, indx: number) => {
      if (schedule.id === el.id) {
        schedule.status = 'Approved'
      }
    })

    this.userInfor.store(this.docSchedule, 'schedules', 'local')

    this.api.genericUpdate('/update-status', el)
      .subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
        complete: () => { }
      })

    console.log(this.docSchedule)

    this.updateSchedule()

  }

  rejectApp(el: any) {
    let MatDialogRef = this.matdialog.open(rejectReasonComponent)
    MatDialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res)
            this.api.genericPost('/sendFeedback', el)
              .subscribe({
                next: (res) => { console.log(res) },
                error: (err) => console.log(err),
                complete: () => { }
              })


            this.docSchedule.forEach((schedule: any) => {
              if (schedule.id === el.id) {
                schedule.status = 'Rejected'
              }
            })

            this.userInfor.store(this.docSchedule, 'schedules', 'local')
            console.log(this.docSchedule)

            this.api.genericPost('/update-status', this.docSchedule)
              .subscribe({
                next: (res) => { console.log(res) },
                error: (err) => { console.log(err) },
                complete: () => { }
              })

            this.updateSchedule()

            // this.dataSource = schedules
            console.log(el)

          }
        },
        error: () => { },
        complete: () => { }
      })
  }

}
