import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesheetCardsComponent } from './timesheet/timesheet-cards/timesheet-cards.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetWeeksComponent } from './timesheet/timesheet-weeks/timesheet-weeks.component';
import { RouterModule } from '@angular/router';
import { TimesheetRecordsComponent } from './timesheet/timesheet-records/timesheet-records.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './admin/register/register.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { TimesheetAdminComponent } from './timesheet/timesheet-admin/timesheet-admin.component';
import { TimesheetWeeksAdminComponent } from './timesheet/timesheet-weeks-admin/timesheet-weeks-admin.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from './_modals/roles-modal/roles-modal.component';
import { NewCardModalComponent } from './_modals/new-card-modal/new-card-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProjectsDatabaseComponent } from './projects/projects-database/projects-database.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NewProjectModalComponent } from './_modals/new-project-modal/new-project-modal.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { EditProjectModalComponent } from './_modals/edit-project-modal/edit-project-modal.component';
import { EditProjectStageModalComponent } from './_modals/edit-project-stage-modal/edit-project-stage-modal.component';
import { ProjectsTeamsComponent } from './projects/projects-teams/projects-teams.component';
import { AssignUserToProjectModalComponent } from './_modals/assign-user-to-project-modal/assign-user-to-project-modal.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    TimesheetCardsComponent,
    TimesheetWeeksComponent,
    TimesheetRecordsComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    UserEditComponent,
    UserListComponent,
    TimesheetAdminComponent,
    TimesheetWeeksAdminComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    RolesModalComponent,
    NewCardModalComponent,
    ProjectsDatabaseComponent,
    NewProjectModalComponent,
    ProjectDetailsComponent,
    EditProjectModalComponent,
    EditProjectStageModalComponent,
    ProjectsTeamsComponent,
    AssignUserToProjectModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right', newestOnTop: true }),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    TabsModule,
    ModalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
