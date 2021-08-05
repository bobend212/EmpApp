import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';

@Component({
  selector: 'app-timesheet-weeks-admin',
  templateUrl: './timesheet-weeks-admin.component.html',
  styleUrls: ['./timesheet-weeks-admin.component.css']
})
export class TimesheetWeeksAdminComponent implements OnInit {
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
        console.log(cardDetails);
      });
  }

  loadWeeks() {
    this.timesheetWeeksService
      .getTimesheetWeeksByCardId(this.route.snapshot.paramMap.get('id'))
      .subscribe((weeks) => {
        this.weeks = weeks;
        console.log(weeks);
      });
  }

}
