import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewTaskModalComponent } from 'src/app/_modals/new-task-modal/new-task-modal.component';
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
  selectedProject: Project;
  model: any = {};
  title: string;
  selectedProjectId: number;

  constructor(
    private tasksService: TasksService,
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.loadProjects();
  }

  getAllTasks() {
    this.title = "All Tasks"
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.selectedProject = null;
    })
  }

  getLoggedUserTasks() {
    this.title = "My Tasks"
    this.tasksService.getTasksByLoggedUser().subscribe(tasks => {
      this.tasks = tasks;
      this.selectedProject = null;
    })
  }

  drop(event: CdkDragDrop<Task[]>, headerTest: string) {
    this.model = {
      itemStage: headerTest
    };

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.editTaskStage(event.item.data.taskItemId, this.model)
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
      this.tasksService.getAllTasksByProject(event).subscribe(tasks => {
        this.tasks = tasks;
        this.selectedProjectId = event;
        this.title = '';
      })
    }
  }

  editTaskStage(taskId, model) {
    this.tasksService
      .editTaskStage(taskId, model)
      .subscribe(
        () => {
          this.toastr.success('Task stage updated');
        },
        (error) => {
          this.toastr.error('Update task stage error: ' + error);
        }
      );
  }

  onOpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.data = {
      title: "New Task"
    };
    // dialogConfig.data = this.tasks;
    let dialog = this.matDialog.open(NewTaskModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      if (this.selectedProject === null) {
        this.getAllTasks();
      }
      else {
        this.tasksService.getAllTasksByProject(this.selectedProjectId).subscribe(tasks => {
          this.tasks = tasks;
        })
      }
    });
  }

  removeTask(task) {
    if (confirm('Are you sure?')) {
      this.tasksService.deleteTask(task.taskItemId).subscribe(() => {
        this.toastr.success('Task removed');
        if (this.selectedProject === null) {
          this.getAllTasks();
        }
        else {
          this.tasksService.getAllTasksByProject(this.selectedProjectId).subscribe(tasks => {
            this.tasks = tasks;
          })
        }
      })
    }
  }

}
