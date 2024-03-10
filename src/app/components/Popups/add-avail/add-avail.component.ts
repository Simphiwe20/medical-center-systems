import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { window } from 'rxjs';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-add-avail',
  templateUrl: './add-avail.component.html',
  styleUrls: ['./add-avail.component.scss']
})
export class AddAvailComponent {

  days: any = [{ day: 'Sunday', startTime: '', endTime: '' }, { day: 'Monday', startTime: '', endTime: '' }, { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' }, { day: 'Thursday', startTime: '', endTime: '' }, { day: 'Friday', startTime: '', endTime: '' }, { day: 'Sartuday', startTime: '', endTime: '' }]
  availHours: any = {startTime: '', endTime: ''}
  availDays: any;

  constructor(private dialogRef: MatDialogRef<AddAvailComponent>, private snackBar: MatSnackBar, private sharedService: SharedServiceService) {
    this.dialogRef.disableClose = true
    this.availDays = localStorage.getItem('availDays')
    this.availDays = this.availDays ? JSON.parse(this.availDays) : []
  }

  save(): any {
    if(!this.availHours.startTime || !this.availHours.endTime) {
      this.snackBar.open('Please add both times to avail yourself', 'OK', {duration: 3000})
      return
    }
   this.close()
   
  }

  close() {
    this.dialogRef.close({data: this.availHours})
    this.sharedService.avalaibility(this.availDays, this.days)
  }
}
