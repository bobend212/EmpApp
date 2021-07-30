import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetRecordsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTimesheetRecordsByWeekId(weekId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/records/' + weekId);
  }

  postTimesheetRecord(model: any) {
    return this.http.post(this.baseUrl + 'timesheet/records', model);
  }

  deleteTimesheetRecord(recordId: number) {
    return this.http.delete(this.baseUrl + 'timesheet/records/' + recordId);
  }
}
