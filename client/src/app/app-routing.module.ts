import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetCardsComponent } from './timesheet/timesheet-cards/timesheet-cards.component';

const routes: Routes = [{ path: '**', component: TimesheetCardsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
