import {ChangeDetectorRef, Component, ContentChild, Input, OnInit} from '@angular/core';
import {chunk, range} from 'lodash';
import {
  addDays,
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  isAfter,
  isBefore,
  isPast,
  isThisMonth,
  isToday,
  isWeekend,
  startOfMonth,
  subDays,
  subMonths
} from 'date-fns';
import {DTCalendarDayDirective} from '../calendar-day/dt-calendar-day.directive';
import {DtService} from '../dt.service';
import {Helper} from '../helper';

@Component({
  selector: 'dt-calendar',
  templateUrl: './dt-calendar.component.html',
  styleUrls: ['./dt-calendar.component.css']
})
export class DTCalendarComponent implements OnInit {
  private page = 1;
  private perPage = 10;
  private categoryId = undefined;
  private tagId = undefined;

  constructor(public dtService: DtService, public cdr: ChangeDetectorRef) {
  }


  @ContentChild(DTCalendarDayDirective) dayTemplate: DTCalendarDayDirective;

  startDate = new Date();
  endDate = new Date();
  filterType = 'Categories';
  filter: any;
  filters: any;
  visible = true;
  isLoading = false;


  ngOnInit(): void {

    this.dtService.getCalendarSettings().subscribe(res1 => {
      this.dtService.calendarSettings = res1.data;
      this.updateEventsList();
      this.dtService.getTaxonomiesList(this.dtService.calendarSettings.id).subscribe(res3 => {
        this.dtService.taxonomiesList = res3.data;
        this.fillTheFilters(this.filterType);
      });
    });

  }

  private updateEventsList(): void {
    this.dtService.getEventsList(this.dtService.calendarSettings.id, {
      start_date: Helper.formatDate(this.startDate),
      end_date: Helper.formatDate(this.endDate),
      page: this.page,
      per_page: this.perPage,
      [this.dtService.taxonomiesList ? this.dtService.taxonomiesList.find(ft => ft.display_name === this.filterType).query_name : undefined]: this.filter ? this.filter : undefined

    }).subscribe(res2 => {
      this.isLoading = false;
      this.dtService.eventsList = res2.data;
    });
  }

  startDateChange(e: any): void {
    this.startDate = e;
    this.perPage = 10;
    this.updateEventsList();

  }

  endDateChange(e: any): void {
    this.endDate = e;
    this.perPage = 10;
    this.updateEventsList();

  }

  loadMore() {
    this.isLoading = true;
    this.perPage = this.perPage + 10;
    this.updateEventsList();
  }

  filterTypeChange(e: any) {
    this.filterType = e;
    this.perPage = 10;
    this.fillTheFilters(e);
    this.filter = undefined;
    this.updateEventsList();
  }

  private fillTheFilters(e: any) {
    this.filters = this.dtService.taxonomiesList.find(ft => ft.display_name === e);
  }

  filterChange(e: any) {
    if (e === 'undefined') {
      e = undefined;
    }
    if (e === 'more') {
      this.visible = false;
      this.dtService.getMoreFilters(this.filters.next_page_url).subscribe(res => {
        const temp = JSON.parse(JSON.stringify(this.filters.items));
        this.filters = res.data;
        this.filters.items.unshift(...temp);
        this.visible = true;
      });
      // this.filters.items
    } else {
      this.perPage = 10;
      this.filter = e;
      this.updateEventsList();
    }
  }

  clearFilter() {
    this.perPage = 10;
    this.filterType = 'Categories';
    this.filter = undefined;
    this.updateEventsList();
  }
}
