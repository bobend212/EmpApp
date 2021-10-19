import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TimesheetCard } from 'src/app/_models/timesheetCard';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-timesheet-admin',
  templateUrl: './timesheet-admin.component.html',
  styleUrls: ['./timesheet-admin.component.css']
})
export class TimesheetAdminComponent implements OnInit {
  model: any;
  accepted_counter = 0;
  rejected_counter = 0;
  none_counter = 0;
  currentFlag: boolean;
  allFlag: boolean;

  displayedColumns: string[] = ['user', 'date', 'totalTime', 'status', 'actions'];
  dataSource: MatTableDataSource<TimesheetCard>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private timesheetCardsService: TimesheetCardsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTimesheetCardsCurrentMonth();
  }

  getTimesheetCards() {
    this.currentFlag = false;
    this.allFlag = true;
    this.timesheetCardsService
      .getTimesheetCards()
      .subscribe((timesheetCards) => {
        this.dataSource = new MatTableDataSource(timesheetCards);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.accepted_counter = timesheetCards.filter(status => status.status == "Accepted").length
        this.rejected_counter = timesheetCards.filter(status => status.status == "Rejected").length
        this.none_counter = timesheetCards.filter(status => status.status == "None").length
        //console.log(this.counter)
      });
  }

  getTimesheetCardsCurrentMonth() {
    this.currentFlag = true;
    this.allFlag = false;
    this.timesheetCardsService
      .getTimesheetCardsOnlyCurrentMonth()
      .subscribe((timesheetCards) => {
        this.dataSource = new MatTableDataSource(timesheetCards);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.accepted_counter = timesheetCards.filter(status => status.status == "Accepted").length
        this.rejected_counter = timesheetCards.filter(status => status.status == "Rejected").length
        this.none_counter = timesheetCards.filter(status => status.status == "None").length
      });
  }

  createModelToUpdateStatus(cardId, status: string) {
    this.model = {
      timesheetCardId: cardId,
      status
    };

    this.timesheetCardsService.updateCardStatus(this.model).subscribe(() => {
      this.toastr.success('Status updated');
      if (this.currentFlag === true) this.getTimesheetCardsCurrentMonth();
      else this.getTimesheetCards();
    }, error => {
      this.toastr.error('status update error');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
