import { Component, OnInit } from '@angular/core';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';

@Component({
  selector: 'app-timesheet-cards',
  templateUrl: './timesheet-cards.component.html',
  styleUrls: ['./timesheet-cards.component.css'],
})
export class TimesheetCardsComponent implements OnInit {
  timesheetCards: any[];

  constructor(private timesheetCardsService: TimesheetCardsService) {}

  ngOnInit(): void {
    this.getTimesheetCards();
  }

  getTimesheetCards() {
    this.timesheetCardsService
      .getTimesheetCards()
      .subscribe((timesheetCards) => {
        this.timesheetCards = timesheetCards;
      });
  }
}
