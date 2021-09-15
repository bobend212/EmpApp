import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-project-planner',
  templateUrl: './project-planner.component.html',
  styleUrls: ['./project-planner.component.css']
})
export class ProjectPlannerComponent implements OnInit, AfterViewChecked {
  tasks: Task[] = [];
  tasks_designDone = [];
  tasks_designBeingChecked = [];
  tasks_beingIssued = [];


  constructor(private tasksService: TasksService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllTasks();

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe(tasks => {
      tasks.filter(item => item.itemStage === "Design done").forEach(task => this.tasks_designDone.push((task)));
      tasks.filter(item => item.itemStage === "Design being checked").forEach(task => this.tasks_designBeingChecked.push((task)));
      tasks.filter(item => item.itemStage === "Being issued").forEach(task => this.tasks_beingIssued.push((task)));

      this.tasks = tasks;
      console.log(this.tasks);
    })
  }

  // drop(event: CdkDragDrop<Project[]>) {
  //   console.log(event.item.data)
  //   moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  // }

  drop(event: CdkDragDrop<Task[]>, headerTest: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.item.data)
      console.log(headerTest)
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('else')
      console.log(event.item.data)
      console.log(headerTest)
    }
  }

}
