import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';

@Component({
  selector: 'app-timesheet-weeks',
  templateUrl: './timesheet-weeks.component.html',
  styleUrls: ['./timesheet-weeks.component.css'],
})
export class TimesheetWeeksComponent implements OnInit {
  weeks: any[] = [];
  cardDetails: any;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private route: ActivatedRoute,
    private timesheetWeeksService: TimesheetWeeksService
  ) { }

  ngOnInit(): void {
    this.loadWeeks();
    this.loadCardDetails();
  }

  loadCardDetails() {
    this.timesheetCardsService
      .getTimesheetCardById(this.route.snapshot.paramMap.get('id'))
      .subscribe((cardDetails) => {
        this.cardDetails = cardDetails;
      });
  }

  loadWeeks() {
    this.timesheetWeeksService
      .getTimesheetWeeksByCardId(this.route.snapshot.paramMap.get('id'))
      .subscribe((weeks) => {
        this.weeks = weeks;
      });
  }

}
