import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimesheetCardsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTimesheetCards() {
    return this.http.get<any>(this.baseUrl + 'timesheet/cards');
  }

  getTimesheetCardsOnlyCurrentMonth() {
    return this.http.get<any>(this.baseUrl + 'timesheet/cards/current');
  }

  getTimesheetCardsByUserId(userId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/cards/my/' + userId);
  }

  getTimesheetCardsByUserIdCurrentYear(userId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/cards/my/current-year/' + userId);
  }

  getTimesheetCardById(cardId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/cards/' + cardId);
  }

  postTimesheetCard(model: any) {
    return this.http.post(this.baseUrl + 'timesheet/cards', model);
  }

  deleteTimesheetCard(cardId: number) {
    return this.http.delete(this.baseUrl + 'timesheet/cards/' + cardId);
  }

  getTimesheetRecordsByCardId(cardId) {
    return this.http.get<any>(this.baseUrl + 'timesheet/records/' + cardId);
  }

  updateCardStatus(model: any) {
    return this.http.put(this.baseUrl + 'timesheet/cards/status/update', model);
  }


}
