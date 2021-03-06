import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkType } from '../_models/workType';

@Injectable({
  providedIn: 'root'
})
export class WorktypesService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getWorkTypes(): Observable<WorkType[]> {
    return this.http.get<WorkType[]>(this.baseUrl + 'api/worktypes');
  }

  addWorkType(model: any) {
    return this.http.post(this.baseUrl + 'api/worktypes', model);
  }


}
