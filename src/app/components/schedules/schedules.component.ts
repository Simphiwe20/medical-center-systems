import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { scheduler } from 'dhtmlx-scheduler';
import { scheduler } from 'dhtmlx-scheduler';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @ViewChild('scheduler_here', { static: true }) schedulerContainer!: ElementRef;
  doc!: any;

  constructor(private shared: SharedServiceService){
    this.doc = this.shared.availDoc
    console.log(this.doc)
    
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
      { name: "Patient name", height: 20, map_to: "Patient_name", type: "textarea", focus: true},
      { name: "Patient's email", height: 40, map_to: "Patient_email", type: "textarea"},
      // { name: "Doctor's name", height: 40, map_to: "Doctor_name", type: "textarea", default_value: `${this.doc ? this.doc.doctorName : ''}` },
      // { name: "Doctor's email", height: 40, map_to: "email", type: "textarea", default_value: `${this.doc ? this.doc.doctorEmail : ''}` },
      // { name: "Status", height: 40, map_to: "status", type: "textarea", default_value: 'Pending',  },
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
      event['status'] = 'Pending',
      console.log(this.doc)
      event['doctorName'] = this.doc.doctorFullName,
      event['doctorEmail'] = this.doc.doctorEmail

      this.events.push(event);
      console.log(this.events)
      localStorage.setItem('schedules', JSON.stringify(this.events));
    });    
  }



}
