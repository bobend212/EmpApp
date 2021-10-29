import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NewCardModalComponent } from 'src/app/_modals/new-card-modal/new-card-modal.component';
import { AppUser } from 'src/app/_models/appUser';
import { TimesheetCard } from 'src/app/_models/timesheetCard';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-timesheet-cards-archive',
  templateUrl: './timesheet-cards-archive.component.html',
  styleUrls: ['./timesheet-cards-archive.component.css']
})
export class TimesheetCardsArchiveComponent implements OnInit {
  timesheetCards: TimesheetCard[] = [];
  appUser: AppUser;
  user: User;

  displayedColumns: string[] = ['date', 'total', 'status', 'created', 'actions'];
  dataSource: MatTableDataSource<TimesheetCard>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private timesheetCardsService: TimesheetCardsService,
    private accountService: AccountService, private usersService: UsersService,
    private matDialog: MatDialog,
    private router: Router,
    private timesheetWeeksService: TimesheetWeeksService
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
        this.dataSource = new MatTableDataSource(timesheetCards);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  onOpenDialogNewTimesheetCard() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '20%';
    const dialog = this.matDialog.open(NewCardModalComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.loadUserData();
    });
  }

  setCardId(cardId) {
    this.timesheetWeeksService.timesheetCardIdToSet = cardId;
    this.router.navigate(['/timesheet/weeks']);
  }

}
