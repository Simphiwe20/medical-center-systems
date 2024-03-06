import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { scheduler } from 'dhtmlx-scheduler';

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @ViewChild('scheduler_here', {static:true}) schedulerContainer!: ElementRef;

  ngOnInit() {
scheduler.init(this.schedulerContainer.nativeElement, new Date(2024, 3, 6));
  }
}
