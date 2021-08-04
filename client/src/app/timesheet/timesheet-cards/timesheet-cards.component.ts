import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/_models/appUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-timesheet-cards',
  templateUrl: './timesheet-cards.component.html',
  styleUrls: ['./timesheet-cards.component.css'],
})
export class TimesheetCardsComponent implements OnInit {
  timesheetCards: any[];
  model: any = {};
  newTimesheetCardForm: FormGroup;

  appUser: AppUser;
  user: User;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private usersService: UsersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.usersService.getUserByUsername(this.user.username).subscribe(appUser => {
      this.appUser = appUser;

      this.intializeForm(appUser.appUserId);
      this.getTimesheetCardsByUserId(appUser.appUserId);
    })
  }

  intializeForm(userId) {
    this.newTimesheetCardForm = this.fb.group({
      customName: [''],
      date: [''],
      appUserId: [userId]
    });
  }

  // getTimesheetCards() {
  //   this.timesheetCardsService
  //     .getTimesheetCards()
  //     .subscribe((timesheetCards) => {
  //       this.timesheetCards = timesheetCards;
  //       console.log(this.newTimesheetCardForm.value);
  //       console.log(this.appUser)
  //     });
  // }

  getTimesheetCardsByUserId(userID) {
    this.timesheetCardsService
      .getTimesheetCardsByUserId(userID)
      .subscribe((timesheetCards) => {
        this.timesheetCards = timesheetCards;
      });
  }

  addNewTimesheetCard() {
    this.timesheetCardsService
      .postTimesheetCard(this.newTimesheetCardForm.value)
      .subscribe(
        (response) => {
          this.getTimesheetCardsByUserId(this.appUser.appUserId);
        },
        (error) => {
          console.log(error.error);
        }
      );
  }

  deleteTimesheetCard(timesheetCard) {
    if (confirm('Are you sure?')) {
      this.timesheetCardsService
        .deleteTimesheetCard(timesheetCard)
        .subscribe(() => {
          this.getTimesheetCardsByUserId(this.appUser.appUserId);
        });
    }
  }
}
