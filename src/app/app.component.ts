import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Holiday Checker';

  holidayList: Holiday[] = [{
    date: '01-01-2021',
    name: "New Year's Day",
    day: 'Friday'
  },
  {
    date: '02-15-2021',
    name: "President's Day",
    day: 'Monday'
  },
  {
    date: '05-09-2021',
    name: "Mother's Day",
    day: 'Sunday'
  },
  {
    date: '07-04-2021',
    name: "Independence Day",
    day: 'Sunday'
  },
  {
    date: '09-06-2021',
    name: "Labor Day",
    day: 'Monday'
  },
  {
    date: '10-11-2021',
    name: "Columbus Day",
    day: 'Monday'
  },
  {
    date: '12-25-2021',
    name: "Christmas Day",
    day: 'Saturday'
  }]
}

export interface Holiday {
  date: string;
  name: string;
  day: string;
}

