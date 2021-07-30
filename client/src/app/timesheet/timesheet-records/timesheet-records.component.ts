import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimesheetRecordsService } from 'src/app/_services/timesheet-records.service';
import { Location } from '@angular/common';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';

@Component({
  selector: 'app-timesheet-records',
  templateUrl: './timesheet-records.component.html',
  styleUrls: ['./timesheet-records.component.css']
})
export class TimesheetRecordsComponent implements OnInit {
  records: any[] = [];
  weekDetails: any;
  newTimesheetRecordForm: FormGroup;

  constructor(
    private timesheetRecordsService: TimesheetRecordsService,
    private timesheetWeeksService: TimesheetWeeksService,
    private _location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadRecords();
    this.loadWeekDetails();
  }

  backClicked() {
    this._location.back();
  }

    loadRecords() {
    this.timesheetRecordsService
      .getTimesheetRecordsByWeekId(this.route.snapshot.paramMap.get('id'))
      .subscribe((records) => {
        this.records = records;
        console.log(records);
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
    this.timesheetRecordsService
      .postTimesheetRecord(this.newTimesheetRecordForm.value)
      .subscribe(
        () => {
          this.loadRecords();
          this.loadWeekDetails();
        },
        (error) => {
          console.log(error.error);
        }
      );
  }

  deleteTimesheetRecord(timesheetRecord) {
    if (confirm('Are you sure?')) {
      this.timesheetRecordsService
        .deleteTimesheetRecord(timesheetRecord)
        .subscribe(() => {
          this.loadRecords();
          this.loadWeekDetails();
        });
    }
  }

  loadWeekDetails() {
    this.timesheetWeeksService
      .getTimesheetWeekDetailsByWeekId(this.route.snapshot.paramMap.get('id'))
      .subscribe((weekDetails) => {
        this.weekDetails = weekDetails;
        console.log(weekDetails);
      });
  }

}
