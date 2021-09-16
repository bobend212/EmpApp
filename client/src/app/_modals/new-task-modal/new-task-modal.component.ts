import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/_models/appUser';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { ProjectService } from 'src/app/_services/project.service';
import { TasksService } from 'src/app/_services/tasks.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit {
  newTaskForm: FormGroup;
  tasks: Task[];
  dataSource: any;
  title: string = 'New Task';

  stages: any[] = [
    'To be done',
    'Design done',
    'Design being checked',
    'Design checked',
    'Design being amended',
    'Design checked - ready for issuing',
    'Being issued',
    'Done & Issued'
  ];

  projects: Project[] = [];
  users: AppUser[] = [];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    private projectService: ProjectService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadProjects();
    this.loadUsers();
  }

  initializeForm() {
    this.newTaskForm = this.fb.group({
      name: [''],
      estimatedTime: [''],
      itemStage: [''],
      projectId: [''],
      userId: ['']
    });
  }

  addTask() {
    this.tasksService.addTask(this.newTaskForm.value).subscribe(
      () => {
        this.toastr.success('Task added');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Insert error: ' + error.error);
      }
    );
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

  loadUsers() {
    this.userService.getUserList().subscribe(users => {
      this.users = users;
    })
  }




}
