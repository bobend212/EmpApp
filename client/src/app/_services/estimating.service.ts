import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estimating } from '../_models/estimating';

@Injectable({
  providedIn: 'root'
})
export class EstimatingService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllEstimations(): Observable<Estimating[]> {
    return this.http.get<Estimating[]>(this.baseUrl + 'api/estimating');
  }

  getEstimatingByProjectId(projectId) {
    return this.http.get<any>(this.baseUrl + 'api/estimating/project/' + projectId);
  }

  addEstimating(model: any) {
    return this.http.post(this.baseUrl + 'api/estimating', model);
  }

  deleteEstimating(estimatingId: number) {
    return this.http.delete(this.baseUrl + 'api/estimating/' + estimatingId);
  }

}
