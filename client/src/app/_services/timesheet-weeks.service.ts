import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetWeeksService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTimesheetWeeksByCardId(cardId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/week/' + cardId);
  }
}
