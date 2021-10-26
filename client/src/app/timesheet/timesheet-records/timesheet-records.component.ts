import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimesheetRecordsService } from 'src/app/_services/timesheet-records.service';
import { Location } from '@angular/common';
import { TimesheetWeeksService } from 'src/app/_services/timesheet-weeks.service';
import { ProjectService } from 'src/app/_services/project.service';
import { WorktypesService } from 'src/app/_services/worktypes.service';
import { Project } from 'src/app/_models/project';
import { WorkType } from 'src/app/_models/workType';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timesheet-records',
  templateUrl: './timesheet-records.component.html',
  styleUrls: ['./timesheet-records.component.css']
})
export class TimesheetRecordsComponent implements OnInit {
  records: any[] = [];
  selectedProject: Project = null;
  projects: Project[] = [];
  selectedWorkType: WorkType = null;
  workTypes: WorkType[] = [];

  weekDetails: any;
  newTimesheetRecordForm: FormGroup;
  record: any;
  isUpdating: boolean;

  dayNames: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  currentDayNumber = new Date().getDay() - 1;
  weekId: any;

  constructor(
    private timesheetRecordsService: TimesheetRecordsService,
    private timesheetWeeksService: TimesheetWeeksService,
    private _location: Location,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private workTypeService: WorktypesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadRecords();
    this.initializeForm();
    this.loadWeekDetails();
    this.loadProjects();
    this.loadWorkTypes();
  }

  loadTimesheetRecord(item) {
    this.timesheetRecordsService.getTimesheetRecordById(item.timesheetRecordId).subscribe(record => {
      this.record = record;
      this.isUpdating = true;

      this.newTimesheetRecordForm.controls.time.setValue(record.time);
      this.newTimesheetRecordForm.controls.date.setValue(record.date);
      this.newTimesheetRecordForm.controls.workTypeId.setValue(record.workTypeId);
      this.newTimesheetRecordForm.controls.projectId.setValue(record.projectId);

    });
    this.toastr.info('updating...');
  }

  cancelUpdate() {
    this.initializeForm();
    this.isUpdating = false;
  }

  updateRecord() {
    this.timesheetRecordsService.updateTimesheetRecord(this.record.timesheetRecordId, this.newTimesheetRecordForm.value).subscribe(() => {
      this.loadRecords();
      this.loadWeekDetails();
      this.toastr.success('Record updated');
      this.newTimesheetRecordForm.reset();
      this.initializeForm();
      this.isUpdating = false;
    });
  }

  backClicked() {
    this._location.back();
  }

  initializeForm() {
    this.newTimesheetRecordForm = this.fb.group({
      time: [''],
      date: [''],
      timesheetWeekId: [this.weekId],
      workTypeId: null,
      projectId: null,
    });
  }

  addNewTimesheetRecord() {
    this.timesheetRecordsService
      .postTimesheetRecord(this.newTimesheetRecordForm.value)
      .subscribe(
        () => {
          this.loadRecords();
          this.loadWeekDetails();
          this.toastr.success('Record added');
        },
        (error) => {
          console.log(error.error);
          this.toastr.error('Invalid form');
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
      .getTimesheetWeekDetailsByWeekId(this.weekId)
      .subscribe((weekDetails) => {
        this.weekDetails = weekDetails;
      });
  }

  loadProjects() {
    this.projectService
      .getProjects().subscribe((projects) => {
        this.projects = projects;
      });
  }

  loadWorkTypes() {
    this.workTypeService
      .getWorkTypes().subscribe((workTypes) => {
        this.workTypes = workTypes;
      });
  }

  sumHoursByDayName(dayName: string): number {
    let sum = 0;
    for (let record of this.records) {
      if (record.dayName === dayName) {
        sum += record.time;
      }
    }
    return sum;
  }

  weekDatesToArray(dayNo: number): Date {
    let date = new Date(this.weekDetails.startWeek);
    let added = new Date(date.setDate(date.getDate() + dayNo));
    return added;
  }

  loadRecords() {
    this.weekId = this.timesheetRecordsService.timesheetWeekIdToGet;
    this.timesheetRecordsService.getTimesheetRecordsByWeekId(this.weekId).subscribe(records => {
      this.records = records;
    })
  }

}