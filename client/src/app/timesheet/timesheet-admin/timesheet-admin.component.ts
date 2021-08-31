import { Component, OnInit } from '@angular/core';
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
  timesheetCards: TimesheetCard[];
  model: any;

  constructor(private timesheetCardsService: TimesheetCardsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTimesheetCards();
  }

  getTimesheetCards() {
    this.timesheetCardsService
      .getTimesheetCards()
      .subscribe((timesheetCards) => {
        this.timesheetCards = timesheetCards;
      });
  }

  createModelToUpdateStatus(cardId, status: string) {
    this.model = {
      timesheetCardId: cardId,
      status
    };

    this.timesheetCardsService.updateCardStatus(this.model).subscribe(() => {
      this.toastr.success('status updated');
      console.log(this.model);
      this.getTimesheetCards();
    }, error => {
      console.log(this.model);
      console.log(error.error);
    });
  }

}
