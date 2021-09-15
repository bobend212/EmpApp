import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';
import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'api/tasks/all');
  }

}
