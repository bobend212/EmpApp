import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { TaskHead } from '../_models/taskHead';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskHead[]> {
    return this.http.get<TaskHead[]>(this.baseUrl + 'api/tasks/all');
  }

  getAllTasksByProject(projectId): Observable<TaskHead[]> {
    return this.http.get<TaskHead[]>(this.baseUrl + 'api/tasks/all/' + projectId);
  }

}
