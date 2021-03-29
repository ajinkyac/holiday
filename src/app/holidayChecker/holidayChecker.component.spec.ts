import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {HolidayChecker} from './holidayChecker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, Type} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HolidayChecker', () => {
  let component: HolidayChecker;
  let fixture: ComponentFixture<HolidayChecker>;
  let compiled;
  let submitBtn;
  let date;
  let holiday;
  let day;
  let injector: TestBed;
  let httpMock: HttpTestingController;


  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [HolidayChecker],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(HolidayChecker, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  const factory = (holidayList) => {
    const fixture: ComponentFixture<HolidayChecker> = TestBed.createComponent(HolidayChecker);
    const component: HolidayChecker = fixture.componentInstance;
    component.holidayList = holidayList;
    const compiled = fixture.debugElement.nativeElement;
    injector = getTestBed();
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  afterEach(() => {
    httpMock.verify();
  });

  const holidayList = [{
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
    date: '11-11-2021',
    name: 'Veterans Day',
    day: 'Thursday'
  },
  {
    date: '11-26-2021',
    name: 'Thanksgiving',
    day: 'Friday'
  },
  {
    date: '12-25-2021',
    name: "Christmas Day",
    day: 'Saturday'
  }];

  it('Should render the Initial UI correctly', async () => {
    const {compiled, fixture} = factory(holidayList);
    await fixture.whenStable();

    submitBtn = getByTestId('submit-button', compiled);

    expect(submitBtn.textContent.trim()).toBe('Get Date');
    expect(getByTestId('date', compiled)).toBeFalsy();
    expect(getByTestId('holiday', compiled)).toBeFalsy();
    expect(getByTestId('day', compiled)).toBeFalsy();
  });

  it('Should correctly check if current date is a holiday and render the correct day as well - 1', async () => {
    const {compiled, fixture} = factory(holidayList);
    await fixture.whenStable();

    submitBtn = getByTestId('submit-button', compiled);

    const url = 'https://jsonmock.hackerrank.com/datetime';
    await submitBtn.click();
    const req = httpMock.expectOne(url)
    req.flush({
      date: "11-26-2021",
      time: "06:22:02 PM"
    })
    await fixture.whenStable();
    fixture.detectChanges();

    expect(req.request.url).toBe(url);
    date = getByTestId('date', compiled);
    holiday = getByTestId('holiday', compiled);
    day = getByTestId('day', compiled);
    expect(date).toBeTruthy();
    expect(date.textContent.trim()).toEqual('Date: 11-26-2021');
    expect(holiday).toBeTruthy();
    expect(holiday.textContent.trim()).toEqual('Thanksgiving');
    expect(day).toBeTruthy();
    expect(day.textContent.trim()).toEqual('Day: Friday');
  });

  it('Should correctly check if current date is a holiday and render the correct day as well - 2', async () => {
    const {compiled, fixture} = factory(holidayList);
    await fixture.whenStable();

    submitBtn = getByTestId('submit-button', compiled);

    const url = 'https://jsonmock.hackerrank.com/datetime';
    await submitBtn.click();
    const req = httpMock.expectOne(url)
    req.flush({
      date: "07-04-2021",
      time: "06:22:02 PM"
    })
    await fixture.whenStable();
    fixture.detectChanges();

    expect(req.request.url).toBe(url);
    const date = getByTestId('date', compiled);
    const holiday = getByTestId('holiday', compiled);
    const day = getByTestId('day', compiled);
    expect(date).toBeTruthy();
    expect(date.textContent.trim()).toEqual('Date: 07-04-2021');
    expect(holiday).toBeTruthy();
    expect(holiday.textContent.trim()).toEqual('Independence Day');
    expect(day).toBeTruthy();
    expect(day.textContent.trim()).toEqual('Day: Sunday');
  });

  it('Should correctly render when current day is not a holiday', async () => {
    const {compiled, fixture} = factory(holidayList);
    await fixture.whenStable();

    submitBtn = getByTestId('submit-button', compiled);

    const url = 'https://jsonmock.hackerrank.com/datetime';
    await submitBtn.click();
    const req = httpMock.expectOne(url)
    req.flush({
      date: "03-29-2021",
      time: "06:22:02 PM"
    })
    await fixture.whenStable();
    fixture.detectChanges();

    expect(req.request.url).toBe(url);
    const date = getByTestId('date', compiled);
    const holiday = getByTestId('holiday', compiled);
    const day = getByTestId('day', compiled);
    expect(date).toBeTruthy();
    expect(date.textContent.trim()).toEqual('Date: 03-29-2021');
    expect(holiday).toBeTruthy();
    expect(holiday.textContent.trim()).toEqual('NOT A HOLIDAY');
    expect(day).toBeFalsy();
  });
});
