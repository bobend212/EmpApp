import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/_models/appUser';
import { TimesheetRecord } from 'src/app/_models/timesheetRecord';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimesheetRecordsService } from 'src/app/_services/timesheet-records.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-open-timesheet-card',
  templateUrl: './open-timesheet-card.component.html',
  styleUrls: ['./open-timesheet-card.component.css']
})
export class OpenTimesheetCardComponent implements OnInit {
  appUser: AppUser;
  user: User;
  records: TimesheetRecord[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private usersService: UsersService,
    private timesheetRecordsService: TimesheetRecordsService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.usersService.getUserByUsername(this.user.username).subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  loadRecords(userID) {
    this.timesheetRecordsService.getCurrentTimesheetRecordsByLoggedUserId(userID).subscribe(records => {
      this.records = records;
      console.log(this.records)
      this.getWeekId(records.weekId)
    }, err => {
      this.toastr.warning('Timesheet Card not found.');
    })
  }

  openRecordsView() {
    this.loadRecords(this.appUser.id);
  }

  getWeekId(weekId) {
    this.timesheetRecordsService.timesheetWeekIdToSet = weekId;
    this.router.navigate(['/timesheet/records']);
  }



}
