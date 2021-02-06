import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCellContentComponent } from './calendar-cell-content.component';

describe('CalendarCellContentComponent', () => {
  let component: CalendarCellContentComponent;
  let fixture: ComponentFixture<CalendarCellContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCellContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCellContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
