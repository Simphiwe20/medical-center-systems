import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { scheduler } from 'dhtmlx-scheduler';
import { scheduler } from 'dhtmlx-scheduler';
import * as Papa from 'papaparse'

interface CsvEvent {
  start_date: string;
  end_date: string;
  text: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  @ViewChild('scheduler_here', { static: true }) schedulerContainer!: ElementRef;
  doc!: any;

  constructor(){
    console.log(this.doc)
    
  }

  
  alert_opts: { key: string, label: string, disabled: boolean }[] = [
    { key: 'Simphiwe', label: 'Simphiwe', disabled: true },
    { key: 'Kea', label: 'Kea', disabled:false },
  ];

  events: any[] = [];

  ngOnInit() {
    scheduler.config.xml_date = '%Y-%m-%d %H:%i';
    scheduler.locale.labels['section_select'] = 'Doctors';
    scheduler.config.lightbox.sections = [
      { name: "Appointment description", height: 50, map_to: "text", type: "textarea", focus: true, color: 'red' },
      { name: "Patient name", height: 20, map_to: "Patient_name", type: "textarea", focus: true },
      { name: "Doctor's name", height: 40, map_to: "Doctor_name", type: "textarea",  focus: true,  },
      { name: "time", height: 72, type: "time", map_to: "auto" }
    ];

    const date =  new Date()

    scheduler.init(this.schedulerContainer.nativeElement, new Date());

  const storedEvents = localStorage.getItem('schedules');
  if (storedEvents) {
    const parsedEvents = JSON.parse(storedEvents);
    this.events = parsedEvents;
    scheduler.parse(parsedEvents);
    console.log('Event Data:', parsedEvents);
  }

  scheduler.attachEvent('onEventChanged', (id, event) => {
    console.log('Event Changed:', id, event.text);

    const index = this.events.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.events[index] = event;
      localStorage.setItem('schedules', JSON.stringify(this.events));
    }
  });

  scheduler.attachEvent('onEventAdded', (id, event) => {
    this.events.push(event);
    console.log(this.events);
    localStorage.setItem('schedules', JSON.stringify(this.events));
  }); 
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {

          const csvData: CsvEvent[] = result.data.map((item: any) => ({
            start_date: item.start_date,
            end_date: item.end_date,
            text: item.text
          }));

          localStorage.setItem('schedules', JSON.stringify(csvData));

          this.loadEvents();
        }
      });
    }
  }

  public loadEvents() {
    const storedEvents = localStorage.getItem('schedules');
    if (storedEvents) {
      
      const parsedEvents = JSON.parse(storedEvents);
      scheduler.parse(parsedEvents);
      console.log('Event Data:', parsedEvents);
    }
  }
}
