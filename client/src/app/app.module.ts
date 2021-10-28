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
import { UserListComponent } from './users/user-list/user-list.component';
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
import { ProjectPlannerComponent } from './projects/project-planner/project-planner.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { NewTaskModalComponent } from './_modals/new-task-modal/new-task-modal.component';
import { ProjectWorkloadComponent } from './projects/project-workload/project-workload.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { YesNoPipe } from './_directives/yes-no.pipe';
import { NewWorkloadModalComponent } from './_modals/new-workload-modal/new-workload-modal.component';
import { EditWorkloadModalComponent } from './_modals/edit-workload-modal/edit-workload-modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { EditTaskModalComponent } from './_modals/edit-task-modal/edit-task-modal.component';
import { ProjectsEstimationsComponent } from './projects/projects-estimations/projects-estimations.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewEstimatingModalComponent } from './_modals/new-estimating-modal/new-estimating-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TabViewModule } from 'primeng/tabview';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { EstimatingNewComponent } from './projects/estimating-new/estimating-new.component';
import { WorkTypesComponent } from './admin/work-types/work-types.component';
import { NewWorktypeModalComponent } from './_modals/new-worktype-modal/new-worktype-modal.component';
import { ChipModule } from 'primeng/chip';
import { PickListModule } from 'primeng/picklist';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { TimesheetCardsArchiveComponent } from './timesheet/timesheet-cards-archive/timesheet-cards-archive.component';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { HomeLoggedComponent } from './home-logged/home-logged.component';
import { MyProjectsCardComponent } from './homepage/my-projects-card/my-projects-card.component';
import { MyTasksCardComponent } from './homepage/my-tasks-card/my-tasks-card.component';
import { TableModule } from 'primeng/table';
import { MatBadgeModule } from '@angular/material/badge';


export const MY_DATEPICKER_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    AssignUserToProjectModalComponent,
    ProjectPlannerComponent,
    NewTaskModalComponent,
    ProjectWorkloadComponent,
    YesNoPipe,
    NewWorkloadModalComponent,
    EditWorkloadModalComponent,
    EditTaskModalComponent,
    ProjectsEstimationsComponent,
    NewEstimatingModalComponent,
    EstimatingNewComponent,
    WorkTypesComponent,
    NewWorktypeModalComponent,
    UserDetailComponent,
    TimesheetCardsArchiveComponent,
    HomeLoggedComponent,
    MyProjectsCardComponent,
    MyTasksCardComponent
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
    MatAutocompleteModule,
    DragDropModule,
    MatTreeModule,
    MatSelectModule,
    MatButtonToggleModule,
    DropdownModule,
    PanelModule,
    CheckboxModule,
    ToggleButtonModule,
    DividerModule,
    SelectButtonModule,
    MatDatepickerModule,
    InputNumberModule,
    ButtonModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    TagModule,
    MatTooltipModule,
    MatStepperModule,
    TabViewModule,
    MatExpansionModule,
    CdkAccordionModule,
    ChipModule,
    PickListModule,
    MatListModule,
    TableModule,
    MatBadgeModule
  ],
  exports: [
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    TabsModule,
    ModalModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATEPICKER_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
