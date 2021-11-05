import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetWeeksService {
  baseUrl = environment.baseUrl;

  set timesheetCardIdToSet(cardId) {
    sessionStorage.setItem('temp_timesheetCard_id', cardId);
  }

  get timesheetCardIdToGet() {
    let cardId: number = parseInt(sessionStorage.getItem('temp_timesheetCard_id'));
    return cardId;
  }

  constructor(private http: HttpClient) { }

  getTimesheetWeeksByCardId(cardId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/week/' + cardId);
  }

  getTimesheetWeekDetailsByWeekId(weekId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/week/' + weekId + '/details');
  }

  getCurrentTimesheetWeeksByLoggedUserId(userId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/week/' + userId + '/current-month');
  }
}
