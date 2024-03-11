import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent } from '../Popups/date-picker/date-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { scheduled } from 'rxjs';
import { rejectReasonComponent } from '../Popups/rejectReason/rejectReason.component';
import { EmailService } from 'src/app/services/email.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

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

  docSchedule: any;
  availDays: any;
  days: any = [{ day: 'Sunday', startTime: '', endTime: '' }, { day: 'Monday', startTime: '', endTime: '' }, { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' }, { day: 'Thursday', startTime: '', endTime: '' }, { day: 'Friday', startTime: '', endTime: '' }, { day: 'Sartuday', startTime: '', endTime: '' }]
  newDays: any;
  user: any;

  constructor(private userInfor: UserInfoService, private matdialog: MatDialog, private api: ApiServiceService,
    private sharedService: SharedServiceService, private emailServ: EmailService) {

    this.user = this.userInfor.get('currentUser', 'session')

    this.availDays = this.userInfor.get('availDays', 'local').filter((day: any) => day.doctorEmail === this.user.email)

    this.sharedService.avalaibility(this.availDays, this.days)
    console.log(this.days)

    this.updateSchedule()

  }

  updateSchedule() {
    this.docSchedule = this.userInfor.get('schedules', 'local')
    this.docSchedule = this.docSchedule.filter((schedule: any) => schedule.email === this.user.email)

    console.log(this.docSchedule)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.docSchedule);
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

  approveApp() {

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
                next: (res) => {console.log(res)},
                error: (err) => console.log(err),
                complete: () => {}
              })
            let schedules = this.userInfor.get('schedules', 'local').filter((day: any) => day.id !== el.id)
            this.userInfor.store(schedules, 'schedules', 'local')
            this.updateSchedule()
          }
        },
        error: () => { },
        complete: () => { }
      })
  }

}
