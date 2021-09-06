import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { UsersService } from 'src/app/_services/users.service';


@Component({
  selector: 'app-assign-user-to-project-modal',
  templateUrl: './assign-user-to-project-modal.component.html',
  styleUrls: ['./assign-user-to-project-modal.component.css']
})
export class AssignUserToProjectModalComponent implements OnInit {
  selectable = true;
  removable = true;

  usersAssigned: any[] = [];
  usersNotAssigned: any[] = [];
  model: any = {};


  constructor(private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: Project, private usersService: UsersService) { }

  ngOnInit() {
    this.getUsersAssigned();
    this.getUsersNotAssigned();
  }

  remove(user: number): void {
    this.projectService
      .deleteUserFromProject(this.data.projectId, user)
      .subscribe(() => {
        this.getUsersAssigned();
        this.getUsersNotAssigned();
      });
  }

  add(event: MatAutocompleteSelectedEvent): void {

    this.model = {
      userId: event.option.value.id,
      projectId: this.data.projectId
    };

    this.projectService.addUserToProject(this.model).subscribe(
      () => {
        this.getUsersAssigned();
        this.getUsersNotAssigned();
      });
  }

  getUsersAssigned() {
    this.projectService
      .getUsersAssignedToProject(this.data.projectId)
      .subscribe((usersAssigned) => {
        this.usersAssigned = usersAssigned;
      });
  }

  getUsersNotAssigned() {
    this.projectService
      .getUsersNotAssignedToProject(this.data.projectId)
      .subscribe((usersNotAssigned) => {
        this.usersNotAssigned = usersNotAssigned;
      });
  }

}
