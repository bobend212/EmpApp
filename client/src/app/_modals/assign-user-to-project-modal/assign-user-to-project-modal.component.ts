import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-assign-user-to-project-modal',
  templateUrl: './assign-user-to-project-modal.component.html',
  styleUrls: ['./assign-user-to-project-modal.component.css']
})
export class AssignUserToProjectModalComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'projectsCount', 'actions'];
  dataSourceUsersAssigned: MatTableDataSource<Project>;
  dataSourceUsersNotAssigned: MatTableDataSource<Project>;

  @ViewChild('MatPaginator1') paginatorAssigned: MatPaginator;
  @ViewChild('MatPaginator2') paginatorNotAsssigned: MatPaginator;
  @ViewChild('MatSort1') sortAssigned: MatSort;
  @ViewChild('MatSort2') sortNotAssigned: MatSort;
  usersAssigned = [];
  usersNotAssigned = [];
  model: any = {};

  title = this.data.number + ' ' + this.data.name;

  constructor(private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: Project, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsersAssigned();
    this.getUsersNotAssigned();
  }

  getUsersAssigned() {
    this.projectService
      .getUsersAssignedToProject(this.data.projectId)
      .subscribe((usersAssigned) => {
        this.dataSourceUsersAssigned = new MatTableDataSource(usersAssigned);
        this.dataSourceUsersAssigned.sort = this.sortAssigned;
        this.dataSourceUsersAssigned.paginator = this.paginatorAssigned;
        this.usersAssigned = usersAssigned;
      });
  }

  getUsersNotAssigned() {
    this.projectService
      .getUsersNotAssignedToProject(this.data.projectId)
      .subscribe((usersNotAssigned) => {
        this.dataSourceUsersNotAssigned = new MatTableDataSource(usersNotAssigned);
        this.dataSourceUsersNotAssigned.sort = this.sortNotAssigned;
        this.dataSourceUsersNotAssigned.paginator = this.paginatorNotAsssigned;
        this.usersNotAssigned = usersNotAssigned;
      });
  }

  assignUserToProject(userId) {
    this.model = {
      projectId: this.data.projectId,
      userId: userId
    };

    this.projectService.addUserToProject(this.model).subscribe(
      () => {
        this.toastr.success('User assigned to project')
        this.getUsersAssigned();
        this.getUsersNotAssigned();
      },
      (error) => {
        console.log(error.error);
        console.log(this.data.projectId);
        console.log(this.model);
      }
    );
  }

  deleteUserFromProject(user) {
    this.projectService
      .deleteUserFromProject(this.data.projectId, user)
      .subscribe(
        () => {
          this.toastr.success('User removed from project')
          this.getUsersAssigned();
          this.getUsersNotAssigned();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsersNotAssigned.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUsersNotAssigned.paginator) {
      this.dataSourceUsersNotAssigned.paginator.firstPage();
    }
  }

}
