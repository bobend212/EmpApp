import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimesheetCardsService } from 'src/app/_services/timesheet-cards.service';

@Component({
  selector: 'app-timesheet-cards',
  templateUrl: './timesheet-cards.component.html',
  styleUrls: ['./timesheet-cards.component.css'],
})
export class TimesheetCardsComponent implements OnInit {
  timesheetCards: any[];
  model: any = {};
  newTimesheetCardForm: FormGroup;

  constructor(
    private timesheetCardsService: TimesheetCardsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTimesheetCards();
    this.initializeForm();
  }

  getTimesheetCards() {
    this.timesheetCardsService
      .getTimesheetCards()
      .subscribe((timesheetCards) => {
        this.timesheetCards = timesheetCards;
      });
  }

  initializeForm() {
    this.newTimesheetCardForm = this.fb.group({
      customName: [''],
      date: [''],
    });
  }

  addNewTimesheetCard() {
    this.timesheetCardsService
      .postTimesheetCard(this.newTimesheetCardForm.value)
      .subscribe(
        (response) => {
          this.getTimesheetCards();
        },
        (error) => {
          console.log(error.error);
        }
      );
  }

  deleteTimesheetCard(timesheetCard) {
    if (confirm('Are you sure?')) {
      this.timesheetCardsService
        .deleteTimesheetCard(timesheetCard)
        .subscribe(() => {
          this.getTimesheetCards();
        });
    }
  }
}
