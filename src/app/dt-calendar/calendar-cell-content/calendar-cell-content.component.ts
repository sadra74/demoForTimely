import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dt-calendar-cell-content',
  templateUrl: './calendar-cell-content.component.html',
  styleUrls: ['./calendar-cell-content.component.less']
})
export class CalendarCellContentComponent implements OnInit {
  Date = Date;
  get day(): any {
    return this._day;
  }

  @Input() set day(value: any) {
    this._day = value;
    console.log(this.day);
  }
  title: string;
  startDate: Date;
  description: string;

   private _day: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
