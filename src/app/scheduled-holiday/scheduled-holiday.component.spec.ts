import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledHolidayComponent } from './scheduled-holiday.component';

describe('ScheduledHolidayComponent', () => {
  let component: ScheduledHolidayComponent;
  let fixture: ComponentFixture<ScheduledHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
