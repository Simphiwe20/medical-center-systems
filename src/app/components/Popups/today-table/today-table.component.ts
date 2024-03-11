import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-today-table',
  templateUrl: './today-table.component.html',
  styleUrls: ['./today-table.component.scss']
})
export class TodayTableComponent {
  todayTable!:any;
  constructor(private getdata:UserInfoService){

    console.log();


    this.todayTable = 
  {

    title: 'today',
    dataSource: this.getdata.get('schedules','local'),
    displayedColumns: ['Patient_name', 'start_date','end_date','text', 'status'],
    displayedHeaders: ["Patient's Name",'From','To','Appointment name', 'status']
  }
  }
  
}
