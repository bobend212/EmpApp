import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { NewCardModalComponent } from 'src/app/_modals/new-card-modal/new-card-modal.component';
import { AppUser } from 'src/app/_models/appUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';
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
  currentYear = new Date().getFullYear();

  appUser: AppUser;
  user: User;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private timesheetWeeksService: TimesheetWeeksService,
    private accountService: AccountService,
    private usersService: UsersService,
    private matDialog: MatDialog,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router
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
      .getTimesheetCardsByUserIdCurrentYear(userID)
      .subscribe((timesheetCards) => {
        this.timesheetCards = timesheetCards;
      });
  }

  setCardId(cardId) {
    this.timesheetWeeksService.timesheetCardIdToSet = cardId;
    this.router.navigate(['/timesheet/weeks']);
  }

  deleteTimesheetCard(timesheetCard) {
    if (confirm('Are you sure?')) {
      this.timesheetCardsService
        .deleteTimesheetCard(timesheetCard.timesheetCardId)
        .subscribe(() => {
          this.getTimesheetCardsByUserId(this.appUser.id);
          this.toastr.success('Timesheet Card ' + this.datePipe.transform(timesheetCard.date, 'MMMM yyyy') + ' removed');
        });
    }
  }

  onOpenDialogNewTimesheetCard() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '20%';
    const dialog = this.matDialog.open(NewCardModalComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.loadUserData();
    });
  }

}
