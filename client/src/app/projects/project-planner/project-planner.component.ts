import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { TaskHead } from 'src/app/_models/taskHead';
import { ProjectService } from 'src/app/_services/project.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-project-planner',
  templateUrl: './project-planner.component.html',
  styleUrls: ['./project-planner.component.css']
})
export class ProjectPlannerComponent implements OnInit {
  tasks: TaskHead[] = [];
  projects: Project[] = [];

  constructor(private tasksService: TasksService, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.loadProjects();
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  drop(event: CdkDragDrop<Task[]>, headerTest: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

  onSelectChange(event) {
    if (event === 0) {
      this.router.navigate(['/project-planner']);
    }
    else {
      this.router.navigate(['/project-planner/all/project/' + event]);
      this.tasksService.getAllTasksByProject(event).subscribe(tasks => {
        this.tasks = tasks;
      })
    }
  }

}
