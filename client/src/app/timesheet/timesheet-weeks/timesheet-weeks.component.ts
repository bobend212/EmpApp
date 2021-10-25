import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-timesheet-weeks',
  templateUrl: './timesheet-weeks.component.html',
  styleUrls: ['./timesheet-weeks.component.css'],
})
export class TimesheetWeeksComponent implements OnInit {
  weeks: any[] = [];
  cardDetails: any;
  cardId: any;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private route: ActivatedRoute,
    private timesheetWeeksService: TimesheetWeeksService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.loadWeeks();
    this.loadCardDetails();
  }

  loadCardDetails() {
    this.timesheetCardsService
      .getTimesheetCardById(this.cardId)
      .subscribe((cardDetails) => {
        this.cardDetails = cardDetails;
      });
  }

  loadWeeks() {
    this.cardId = this.timesheetWeeksService.timesheetCardIdToGet;
    this.timesheetWeeksService.getTimesheetWeeksByCardId(this.cardId).subscribe(weeks => {
      this.weeks = weeks;
    })
  }

  back(): void {
    this._location.back();
  }

}
