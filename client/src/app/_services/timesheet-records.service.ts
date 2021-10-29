import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetRecordsService {
  baseUrl = environment.baseUrl;

  set timesheetWeekIdToSet(weekId) {
    sessionStorage.setItem('temp_timesheetWeek_id', weekId);
  }

  get timesheetWeekIdToGet() {
    let weekId: number = parseInt(sessionStorage.getItem('temp_timesheetWeek_id'));
    return weekId;
  }

  constructor(private http: HttpClient) { }

  getTimesheetRecordsByWeekId(weekId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/records/' + weekId);
  }

  getCurrentTimesheetRecordsByLoggedUserId(userId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/records/' + userId + '/current-week');
  }

  postTimesheetRecord(model: any) {
    return this.http.post(this.baseUrl + 'timesheet/records', model);
  }

  deleteTimesheetRecord(recordId: number) {
    return this.http.delete(this.baseUrl + 'timesheet/records/' + recordId);
  }

  getTimesheetRecordById(recordId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/records/id/' + recordId);
  }

  updateTimesheetRecord(recordId, model: any) {
    return this.http.put(this.baseUrl + 'timesheet/records/' + recordId, model);
  }
}
