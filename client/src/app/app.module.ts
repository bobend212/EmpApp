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
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right', newestOnTop: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
