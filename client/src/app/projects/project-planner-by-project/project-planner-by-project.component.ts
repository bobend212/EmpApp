import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewTaskModalComponent } from 'src/app/_modals/new-task-modal/new-task-modal.component';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { TaskHead } from 'src/app/_models/taskHead';
import { ProjectService } from 'src/app/_services/project.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-project-planner-by-project',
  templateUrl: './project-planner-by-project.component.html',
  styleUrls: ['./project-planner-by-project.component.css']
})
export class ProjectPlannerByProjectComponent implements OnInit {
  tasks: TaskHead[] = [];
  projects: Project[] = [];
  project: Project;
  model: any = {};

  constructor(private tasksService: TasksService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTasksByProject();
    this.loadProjects();
    this.loadProject();
  }

  getAllTasksByProject() {
    this.tasksService.getAllTasksByProject(this.route.snapshot.paramMap.get('projectId')).subscribe(tasks => {
      this.tasks = tasks;
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
      this.router.navigateByUrl('/project-planner/all/project/' + event);
      this.tasksService.getAllTasksByProject(event).subscribe(tasks => {
        this.tasks = tasks;
      })
      this.projectService.getProject(event).subscribe(project => {
        this.project = project;
      })
    }
  }

  editTaskStage(taskId, model) {
    this.tasksService
      .editTaskStage(taskId, model)
      .subscribe(
        (response) => {
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
    dialogConfig.data = this.tasks;
    let dialog = this.matDialog.open(NewTaskModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.getAllTasksByProject();
    });
  }

  loadProject() {
    this.projectService.getProject(this.route.snapshot.paramMap.get('projectId')).subscribe(project => {
      this.project = project;
    })
  }

  removeTask(task) {
    if (confirm('Are you sure?')) {
      this.tasksService.deleteTask(task.taskItemId).subscribe(() => {
        this.toastr.success('Task removed');
        this.getAllTasksByProject();
      })
    }
  }

}