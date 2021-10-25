import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RegisterComponent } from './admin/register/register.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { EstimatingNewComponent } from './projects/estimating-new/estimating-new.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectPlannerComponent } from './projects/project-planner/project-planner.component';
import { ProjectWorkloadComponent } from './projects/project-workload/project-workload.component';
import { ProjectsDatabaseComponent } from './projects/projects-database/projects-database.component';
import { ProjectsEstimationsComponent } from './projects/projects-estimations/projects-estimations.component';
import { ProjectsTeamsComponent } from './projects/projects-teams/projects-teams.component';
import { TimesheetAdminComponent } from './timesheet/timesheet-admin/timesheet-admin.component';
import { TimesheetCardsArchiveComponent } from './timesheet/timesheet-cards-archive/timesheet-cards-archive.component';
import { TimesheetCardsComponent } from './timesheet/timesheet-cards/timesheet-cards.component';
import { TimesheetRecordsComponent } from './timesheet/timesheet-records/timesheet-records.component';
import { TimesheetWeeksAdminComponent } from './timesheet/timesheet-weeks-admin/timesheet-weeks-admin.component';
import { TimesheetWeeksComponent } from './timesheet/timesheet-weeks/timesheet-weeks.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timesheet/weeks', component: TimesheetWeeksComponent, canActivate: [AuthGuard] },
  { path: 'timesheet/weeks/admin/:id', component: TimesheetWeeksAdminComponent },
  { path: 'timesheet/records/:id', component: TimesheetRecordsComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'timesheets', component: TimesheetCardsComponent, canActivate: [AuthGuard] },
  { path: 'timesheets-archive', component: TimesheetCardsArchiveComponent, canActivate: [AuthGuard] },
  { path: 'projects-database', component: ProjectsDatabaseComponent, canActivate: [AuthGuard] },
  { path: 'project-planner', component: ProjectPlannerComponent, canActivate: [AuthGuard] },
  { path: 'project-workload', component: ProjectWorkloadComponent, canActivate: [AuthGuard] },
  { path: 'projects-teams', component: ProjectsTeamsComponent, canActivate: [AuthGuard] },
  { path: 'projects-estimations', component: ProjectsEstimationsComponent, canActivate: [AuthGuard] },
  { path: 'projects-estimations/create', component: EstimatingNewComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'timesheet/admin', component: TimesheetAdminComponent, canActivate: [AuthGuard] },
  { path: 'user/edit', component: UserEditComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
