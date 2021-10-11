import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  title: string = 'New Task';
  selectedProject: Project;
  selectedUser: AppUser;
  projects: Project[] = [];
  users: AppUser[] = [];

  stages: any[] = [
    { stageName: 'To be done' },
    { stageName: 'Design done' },
    { stageName: 'Design being checked' },
    { stageName: 'Design checked' },
    { stageName: 'Design being amended' },
    { stageName: 'Design checked - ready for issuing' },
    { stageName: 'Being issued' },
    { stageName: 'Done & Issued' }
  ];

  taskNames: any[] = [
    { name: 'Panels' },
    { name: 'Floor' },
    { name: 'Roof' },
    { name: 'Sections' },
    { name: 'Slab' },
    { name: 'Steel' },
    { name: 'Issuing' },
    { name: 'Checking' },
    { name: 'GF Portal' },
    { name: 'DF Posts & Beams' },
    { name: 'Other' }
  ];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    private projectService: ProjectService,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadProjects();
    this.loadUsers();
  }

  initializeForm() {
    this.newTaskForm = this.fb.group({
      name: null,
      estimatedTime: [0],
      itemStage: 'To be done',
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
