# Interview Scheduler

An application which allows users to book 1 hour interviews from Monday - Friday, anytime between 12PM to 4PM.
The number of spots will update on the left as appointments are created or deleted.
Appointments can be changed, the student name or interviewer can be updated.
There are only 5 interviewers to choose from api provided.


Below are some screenshots.<br/>
This is the homepage!
!["Homepage"](https://raw.githubusercontent.com/haphamo/scheduler/master/docs/Homepage.png)
Creating a new Appointment
!["Create Appointment"](https://github.com/haphamo/scheduler/blob/master/docs/create-appointment.png)
Hover over the appointment to edit or delete
!["HoverView](https://github.com/haphamo/scheduler/blob/master/docs/hoverview.png)
It will prompt you to confirm if you want to delete before deleting
!["confirmDelete](https://raw.githubusercontent.com/haphamo/scheduler/master/docs/confirm-delete.png)
The spots will update as appointments are created or deleted.<br/>
If the day is full, the view will change to display
<p>!["spots](https://raw.githubusercontent.com/haphamo/scheduler/master/docs/spots-full.png)</p>
A name must be inputed and interviewer must be selected to book an appointment<br/>
Otherwise an error will occur
![errorNoName](https://raw.githubusercontent.com/haphamo/scheduler/master/docs/error-no-name.png)
![errorNoInterviewer](https://raw.githubusercontent.com/haphamo/scheduler/master/docs/error-no-interviewer.png)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
