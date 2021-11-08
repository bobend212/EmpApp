import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';
import { Workload } from '../_models/workload';

@Injectable({
  providedIn: 'root'
})
export class WorkloadService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllWorkloads(): Observable<Workload[]> {
    return this.http.get<Workload[]>(this.baseUrl + 'api/workload/all');
  }

  getAllWorkloadsChartData(): Observable<Workload[]> {
    return this.http.get<Workload[]>(this.baseUrl + 'api/workload/chart-data');
  }

  getAllWorkloadsIssued(): Observable<Workload[]> {
    return this.http.get<Workload[]>(this.baseUrl + 'api/workload/issued');
  }

  getAllWorkloadsActive(): Observable<Workload[]> {
    return this.http.get<Workload[]>(this.baseUrl + 'api/workload/active');
  }

  addWorkload(model: any) {
    return this.http.post(this.baseUrl + 'api/workload', model);
  }

  deleteWorkload(workloadId: number) {
    return this.http.delete(this.baseUrl + 'api/workload/' + workloadId);
  }

  editWorkload(workloadId: number, workload: Workload) {
    return this.http.put<any>(this.baseUrl + 'api/workload/' + workloadId, workload);
  }


}
