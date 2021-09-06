import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';

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

  getProject(projectId) {
    return this.http.get<any>(this.baseUrl + 'api/projects/' + projectId);
  }

  editProject(projectId: number, project: Project) {
    return this.http.put<any>(this.baseUrl + 'api/projects/' + projectId, project);
  }

  editProjectStage(projectId: number, project: Project) {
    return this.http.put<any>(this.baseUrl + 'api/projects/stage/' + projectId, project);
  }

}

