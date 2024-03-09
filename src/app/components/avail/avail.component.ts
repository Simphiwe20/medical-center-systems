import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent } from '../Popups/date-picker/date-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharedServiceService } from 'src/app/services/shared-service.service';

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

  availDays: any;
  days: any = [{ day: 'Sunday', startTime: '', endTime: '' }, { day: 'Monday', startTime: '', endTime: '' }, { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' }, { day: 'Thursday', startTime: '', endTime: '' }, { day: 'Friday', startTime: '', endTime: '' }, { day: 'Sartuday', startTime: '', endTime: '' }]
  newDays: any;

  constructor(private matdialog: MatDialog, private sharedService: SharedServiceService) {
    this.availDays = localStorage.getItem('availDays')
    this.availDays = this.availDays ? JSON.parse(this.availDays) : []
    this.sharedService.avalaibility(this.availDays, this.days)
    console.log(this.days)

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

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
        next: (res) => {},
        error: (err) => console.log(err),
        complete: () => { }

      })
  }

}
