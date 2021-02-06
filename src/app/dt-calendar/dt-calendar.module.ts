import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DTCalendarComponent } from './calendar/dt-calendar.component';
import { DTCalendarDayDirective } from './calendar-day/dt-calendar-day.directive';
import { DTCalendarCellComponent } from './calendar-cell/dt-calendar-cell.component';
import { CalendarCellContentComponent } from './calendar-cell-content/calendar-cell-content.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DTCalendarComponent,
    DTCalendarDayDirective,
    DTCalendarCellComponent, CalendarCellContentComponent
  ],
  exports: [
    DTCalendarComponent,
    DTCalendarDayDirective,
    DTCalendarCellComponent,
    CalendarCellContentComponent
  ]
})
export class DTCalendarModule { }
