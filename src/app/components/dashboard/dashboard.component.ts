import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/services/user-info.service';
import { SchedulesComponent } from '../schedules/schedules.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

 
  displayedColumns: string[] = ['Patient_name', 'doctorName','start_date', 'start_time', 'end_time', 'status']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isDoctor: boolean = false;
  approvedSchedule: any;
  availDays: any;
  todaySchedules: any;
  monthSchedules: any;
  user: any;
  today: any;
  month: Date;
  dataSource!: MatTableDataSource<[]>;
  App: any = []



  constructor(private userService: UserInfoService, private dialog: MatDialog, private shared: SharedServiceService) {
    this.availDays = this.userService.get('availDays', 'local')
    this.todaySchedules = this.userService.get('schedules', 'local').filter((schedule: any) => schedule.start_date === new Date())
    this.monthSchedules = this.userService.get('schedules', 'local').filter((schedule: any) => console.log(new Date(schedule.start_date).getMonth()))
    console.log(this.availDays)
    this.user = sessionStorage.getItem('currentUser')
    this.user = JSON.parse(this.user)

    this.approvedSchedule = this.userService.get('approvedSchedule','local')


    if (this.user.role === 'doctor') {
      this.dataSource = this.approvedSchedule = this.userService.get('approvedSchedules','local')
    }else {
      this.dataSource = this.userService.get('schedules', 'local')
    }
    // this.today = this.userService.get('schedule')

    this.month = this.shared.getMonth()

    let loggedIn = this.user.role !== 'doctor' ? ['Patient_name', 'doctorName','start_date', 'start_time', 'end_time', 'status'] : ['Patient_name','start_date', 'start_time', 'end_time', 'status'];
    this.displayedColumns = loggedIn

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

  open() {
    this.dialog.open(SchedulesComponent, {
      width: '80vw',
      maxWidth: '100vw',
    })
  }

  getUser(doc: any): any {
    this.shared.getAvail(doc)
    console.log(doc)
  }
}
