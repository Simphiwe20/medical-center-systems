import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { scheduler } from 'dhtmlx-scheduler';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @ViewChild('scheduler_here', { static: true }) schedulerContainer!: ElementRef;

  constructor(){
    
  }

  alert_opts: { key: string, label: string, disabled: boolean }[] = [
    { key: 'Simphiwe', label: 'Simphiwe', disabled: true },
    { key: 'Kea', label: 'Kea', disabled:false },
  ];

  events: any[] = [];

  ngOnInit() {
    scheduler.locale.labels['section_select'] = 'Doctors';


    scheduler.config.lightbox.sections = [
      { name: "Appointment description", height: 50, map_to: "text", type: "textarea", focus: true, color: 'red' },
      { name: "Patient name", height: 20, map_to: "Patient_name", type: "textarea", focus: true },
      { name: "Doctor's name", height: 40, map_to: "Doctor_name", type: "select", options: this.alert_opts },
      { name: "time", height: 72, type: "time", map_to: "auto", color: 'yellow' }
    ];

    const date = new Date().getDay()
    console.log(new Date)

    // Other initialization code
    scheduler.init(this.schedulerContainer.nativeElement, new Date());

    // Load events from local storage
    const storedEvents = localStorage.getItem('schedules');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      this.events = parsedEvents;
      scheduler.parse(parsedEvents);
    }

    scheduler.attachEvent('onEventChanged', (id, event) => {
      console.log('Event Changed:', id, event.text);
      
      // Update the event in the local storage
      const index = this.events.findIndex((item) => item.id === id);
      if (index !==-1) {
        this.events[index] = event;
        localStorage.setItem('schedules', JSON.stringify(this.events));
      }
    });

    scheduler.attachEvent('onEventAdded', (id, event) => {
      this.events.push(event);
      console.log(this.events)
      localStorage.setItem('schedules', JSON.stringify(this.events));
    });    
  }
}
