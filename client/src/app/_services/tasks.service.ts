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

  getTasksByLoggedUser(): Observable<TaskHead[]> {
    return this.http.get<TaskHead[]>(this.baseUrl + 'api/tasks/my-tasks');
  }

  getAllTasksByProject(projectId): Observable<TaskHead[]> {
    return this.http.get<TaskHead[]>(this.baseUrl + 'api/tasks/all/' + projectId);
  }

  editTaskStage(taskId: number, task: Task) {
    return this.http.put<any>(this.baseUrl + 'api/tasks/edit-task-stage/' + taskId, task);
  }

  addTask(model: any) {
    return this.http.post(this.baseUrl + 'api/tasks', model);
  }

  deleteTask(taskId: number) {
    return this.http.delete(this.baseUrl + 'api/tasks/' + taskId);
  }

  editTask(taskId: number, task: Task) {
    return this.http.put<any>(this.baseUrl + 'api/tasks/edit-task/' + taskId, task);
  }


}
