import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Project } from '../_models/project';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'api/projects');
  }

  addProject(model: any) {
    return this.http.post(this.baseUrl + 'api/projects', model);
  }

  deleteProject(projectId: number) {
    return this.http.delete(this.baseUrl + 'api/projects/' + projectId);
  }

}

