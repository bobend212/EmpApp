import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetCardsComponent } from './timesheet/timesheet-cards/timesheet-cards.component';
import { TimesheetRecordsComponent } from './timesheet/timesheet-records/timesheet-records.component';

const routes: Routes = [
  { path: 'timesheet/records/:id', component: TimesheetRecordsComponent },
  { path: '**', component: TimesheetCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
