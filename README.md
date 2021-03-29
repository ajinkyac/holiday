# Holiday Checker

*JSON API URL :*
`https://jsonmock.hackerrank.com/datetime`

## Environment 

- Angular CLI Version: 10.0.9
- Angular Core Version: 10.0.9
- Node Version: v12 (LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/UHR-KSRauJEUdURvFdfpug/holiday-checker.gif)

## Functionality Requirements

The component must have the following functionalities:

- The component receives a list of holiday as a prop named `holidayList`, which is an array of `Holiday` typed objects. `Holiday` type has the below interface:
```
  interface Holiday {
    date: string;
    name: string;
    day: string;
  }
```

- Clicking on the `Get Date` button should make an API GET call to the URL `https://jsonmock.hackerrank.com/datetime` using the Angular HttpClient module.

- The response of the API GET call has the below schema where `date` value refers to current date.
```
  interface ApiResponse {
    date: string;
    time: string
  }
```

- Render the date value in the given div as - `<div data-test-id="date">Date: {date}</div>` , where `{date}` is the value retrieved.

- Check if the date retrieved is a holiday by comparing the `date` value in `holidayList`.

- If its a holiday render:
  - `<div data-test-id="holiday">{name}</div>` , where `{name}` is the holiday name
  - Retrieve the corresponding day value from the `holidayList`, and render as `<div data-test-id="day">Day: {day}</div>` , where `{day}` is the value retrieved.

- If its not a holiday render:
  - `<div data-test-id="holiday">NOT A HOLIDAY</div>`
  - Do not render day div `<div data-test-id="day">` in this scenario.

- The date, holiday and days divs should not be rendered initially since no API has been hit yet. They should only be rendered once API is hit and we have the correct data.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The `Get Date` button: `submit-button`
- The date div: `date`
- The holiday div: `holiday`
- The day div: `day`

Please note that the component has the listed data-test-id attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.

## Project Specifications

**Read Only Files**
- src/app/app.component.spec.ts
- src/app/holidayChecker/holidayChecker.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
