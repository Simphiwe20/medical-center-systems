import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaComponent } from './ava.component';

describe('AvaComponent', () => {
  let component: AvaComponent;
  let fixture: ComponentFixture<AvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
