import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './admin/register/register.component';
import { HomeComponent } from './home/home.component';
import { TimesheetCardsComponent } from './timesheet/timesheet-cards/timesheet-cards.component';
import { TimesheetRecordsComponent } from './timesheet/timesheet-records/timesheet-records.component';
import { TimesheetWeeksComponent } from './timesheet/timesheet-weeks/timesheet-weeks.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timesheet/weeks/:id', component: TimesheetWeeksComponent},
  { path: 'timesheet/records/:id', component: TimesheetRecordsComponent},
  { path: 'timesheets', component: TimesheetCardsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
