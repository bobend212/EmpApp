import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/_models/appUser';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-assign-user-to-project-modal',
  templateUrl: './assign-user-to-project-modal.component.html',
  styleUrls: ['./assign-user-to-project-modal.component.css']
})
export class AssignUserToProjectModalComponent implements OnInit {

  model: any = {};
  title = this.data.number + ' ' + this.data.name;
  sourceUsers: AppUser[] = [];
  targetUsers: AppUser[] = [];

  constructor(private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: Project, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsersAssigned();
    this.getUsersNotAssigned();
  }

  getUsersAssigned() {
    this.projectService.getUsersAssignedToProject(this.data.projectId).subscribe(users => this.targetUsers = users);
  }

  getUsersNotAssigned() {
    this.projectService.getUsersNotAssignedToProject(this.data.projectId).subscribe(users => this.sourceUsers = users);
  }

  assignUserToProject(user) {
    this.model = {
      projectId: this.data.projectId,
      userId: user.items[0].id
    };

    this.projectService.addUserToProject(this.model).subscribe(
      () => {
        this.toastr.success('User assigned to project')
        this.getUsersAssigned();
        this.getUsersNotAssigned();
      },
      (error) => {
        this.toastr.error('Error: ' + error.error)
      }
    );
  }

  deleteUserFromProject(user) {
    this.projectService
      .deleteUserFromProject(this.data.projectId, user.items[0].id)
      .subscribe(
        () => {
          this.toastr.success('User removed from project')
          this.getUsersAssigned();
          this.getUsersNotAssigned();
        },
        (error) => {
          this.toastr.error('Error: ' + error.error)
        }
      );
  }

}
