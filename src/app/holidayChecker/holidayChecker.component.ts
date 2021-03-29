import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, takeWhile } from 'rxjs/operators';
import { Holiday } from '../app.component';

interface ApiResponse {
  date: string;
  time: string
}

@Component({
  selector: 'holiday-checker',
  templateUrl: './holidayChecker.component.html',
  styleUrls: ['./holidayChecker.component.scss']
})
export class HolidayChecker implements OnDestroy {
  public isHolidayFetched = false;
  public isItHoliday = false;
  public holiday: Holiday;
  @Input() holidayList: Holiday[];
  URL = `https://jsonmock.hackerrank.com/datetime`;

  private subscription = true;

  constructor(private http: HttpClient) {
  }
  
  getDate(): void {
    this.lookUpHoliday()
        .pipe(takeWhile(() => this.subscription))
        .subscribe((response: ApiResponse) => {
          this.isHolidayFetched = true;
          const holidayListLength = this.holidayList.length;

          this.holiday = {
            date: response.date,
            day: '',
            name: ''
          };

          for (let i = 0; i < holidayListLength; i++) {
            const receivedDate = new Date(response.date);
            const holiday = new Date(this.holidayList[i].date);

            if (receivedDate.getTime() === holiday.getTime()) {
              this.isItHoliday = true;
              this.holiday = this.holidayList[i];
              break;
            }
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.isHolidayFetched = false;
        });
  }

  private lookUpHoliday(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  ngOnDestroy(): void {
    this.subscription = false;
  }
}
