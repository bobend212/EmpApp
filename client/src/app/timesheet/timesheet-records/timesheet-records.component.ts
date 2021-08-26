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

@Component({
  selector: 'app-timesheet-records',
  templateUrl: './timesheet-records.component.html',
  styleUrls: ['./timesheet-records.component.css']
})
export class TimesheetRecordsComponent implements OnInit {
  records: any[] = [];
  projects: Project[] = [];
  workTypes: WorkType[] = [];
  weekDetails: any;
  newTimesheetRecordForm: FormGroup;

  constructor(
    private timesheetRecordsService: TimesheetRecordsService,
    private timesheetWeeksService: TimesheetWeeksService,
    private _location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private workTypeService: WorktypesService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadRecords();
    this.loadWeekDetails();
    this.loadProjects();
    this.loadWorkTypes();
  }

  backClicked() {
    this._location.back();
  }

  loadRecords() {
    this.timesheetRecordsService
      .getTimesheetRecordsByWeekId(this.route.snapshot.paramMap.get('id'))
      .subscribe((records) => {
        this.records = records;
      });
  }

  initializeForm() {
    this.newTimesheetRecordForm = this.fb.group({
      time: [''],
      date: [''],
      timesheetWeekId: [this.route.snapshot.paramMap.get('id')],
      workTypeId: [''],
      projectId: [''],
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

}
