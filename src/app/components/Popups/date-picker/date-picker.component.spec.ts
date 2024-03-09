import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/components/Popups/time/time.component.spec.ts
import { TimeComponent } from './time.component';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeComponent);
========
import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
>>>>>>>> 058035f814bfc4edfb3e770b3c64f44e570d65b6:src/app/components/Popups/date-picker/date-picker.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
