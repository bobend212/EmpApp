import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { NewCardModalComponent } from 'src/app/_modals/new-card-modal/new-card-modal.component';
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
  timesheetCards: any[] = [];
  model: any = {};
  newTimesheetCardForm: FormGroup;
  bsModalRef: BsModalRef;

  appUser: AppUser;
  user: User;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private usersService: UsersService,
    private modalService: BsModalService,
    private matDialog: MatDialog
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.usersService.getUserByUsername(this.user.username).subscribe(appUser => {
      this.appUser = appUser;
      this.getTimesheetCardsByUserId(appUser.id);
    });
  }

  getTimesheetCardsByUserId(userID) {
    this.timesheetCardsService
      .getTimesheetCardsByUserId(userID)
      .subscribe((timesheetCards) => {
        this.timesheetCards = timesheetCards;
      });
  }

  deleteTimesheetCard(timesheetCard) {
    if (confirm('Are you sure?')) {
      this.timesheetCardsService
        .deleteTimesheetCard(timesheetCard)
        .subscribe(() => {
          this.getTimesheetCardsByUserId(this.appUser.id);
        });
    }
  }

  onOpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '20%';
    const dialog = this.matDialog.open(NewCardModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadUserData();
    });
  }

}
