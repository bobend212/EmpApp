import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/_models/appUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-new-card-modal',
  templateUrl: './new-card-modal.component.html',
  styleUrls: ['./new-card-modal.component.css']
})
export class NewCardModalComponent implements OnInit {
  timesheetCards: any[] = [];
  newTimesheetCardForm: FormGroup;
  bsModalRef: BsModalRef;

  appUser: AppUser;
  user: User;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<NewCardModalComponent>,
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

      this.intializeForm(appUser.id);
      //this.getTimesheetCardsByUserId(appUser.id);
    })
  }

  intializeForm(userId) {
    this.newTimesheetCardForm = this.fb.group({
      date: [''],
      appUserId: [userId]
    });
  }

  // getTimesheetCardsByUserId(userID) {
  //   this.timesheetCardsService
  //     .getTimesheetCardsByUserId(userID)
  //     .subscribe((timesheetCards) => {
  //       this.timesheetCards = timesheetCards;
  //     });
  // }

  addNewTimesheetCard() {
    this.timesheetCardsService
      .postTimesheetCard(this.newTimesheetCardForm.value)
      .subscribe(
        (response) => {
          this.dialogRef.close();
          this.toastr.success("Timesheet Card created");
        },
        (error) => {
          console.log(error);
          console.log(this.newTimesheetCardForm.value)
        }
      );
  }

}
