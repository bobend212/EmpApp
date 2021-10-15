import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  getProjectsWithoutWorkload(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'api/projects/non-workload');
  }

  getProjectsWithoutEstimating(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'api/projects/non-estimated');
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

  //

  getUsersAssignedToProject(projectId: number) {
    return this.http.get<any>(this.baseUrl + 'api/projects/' + projectId + '/users-assigned');
  }

  getUsersNotAssignedToProject(projectId: number) {
    return this.http.get<any>(this.baseUrl + 'api/projects/' + projectId + '/users-not-assigned');
  }

  addUserToProject(model: any) {
    return this.http.post(this.baseUrl + 'api/user-project/', model);
  }

  deleteUserFromProject(projectId: any, userId: any): Observable<any> {

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { projectId, userId } }

    return this.http.delete(this.baseUrl + 'api/user-project/', options);
  }

}

