import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';

@Component({
  selector: 'app-timesheet-records',
  templateUrl: './timesheet-records.component.html',
  styleUrls: ['./timesheet-records.component.css'],
})
export class TimesheetRecordsComponent implements OnInit {
  weeks: any[] = [];
  cardDetails: any;
  newTimesheetRecordForm: FormGroup;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private timesheetWeeksService: TimesheetWeeksService
  ) {}

  ngOnInit(): void {
    //this.loadRecords();
    this.loadWeeks();
    this.loadCardDetails();
    this.initializeForm();
  }

  // loadRecords() {
  //   this.timesheetCardsService
  //     .getTimesheetRecordsByCardId(this.route.snapshot.paramMap.get('id'))
  //     .subscribe((records) => {
  //       this.records = records;
  //       console.log(records);
  //     });
  // }

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
    });
  }

  initializeForm() {
    this.newTimesheetRecordForm = this.fb.group({
      time: [''],
      date: [''],
      timesheetWeekId: [this.route.snapshot.paramMap.get('id')],
    });
  }

  addNewTimesheetRecord() {
    this.timesheetCardsService
      .postTimesheetRecord(this.newTimesheetRecordForm.value)
      .subscribe(
        (response) => {
          //this.loadRecords();
          this.loadCardDetails();
          console.log(this.newTimesheetRecordForm.value);
        },
        (error) => {
          console.log(error.error);
          console.log(this.newTimesheetRecordForm.value);
        }
      );
  }

  deleteTimesheetRecord(timesheetRecord) {
    if (confirm('Are you sure?')) {
      this.timesheetCardsService
        .deleteTimesheetRecord(timesheetRecord)
        .subscribe(() => {
          //this.loadRecords();
          this.loadCardDetails();
        });
    }
  }
}
