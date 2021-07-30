import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetCardsComponent } from './timesheet/timesheet-cards/timesheet-cards.component';
import { TimesheetRecordsComponent } from './timesheet/timesheet-records/timesheet-records.component';
import { TimesheetWeeksComponent } from './timesheet/timesheet-weeks/timesheet-weeks.component';

const routes: Routes = [
  { path: 'timesheet/weeks/:id', component: TimesheetWeeksComponent},
  { path: 'timesheet/records/:id', component: TimesheetRecordsComponent},
  { path: 'timesheets', component: TimesheetCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
