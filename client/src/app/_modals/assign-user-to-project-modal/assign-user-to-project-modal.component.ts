import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { UsersService } from 'src/app/_services/users.service';


@Component({
  selector: 'app-assign-user-to-project-modal',
  templateUrl: './assign-user-to-project-modal.component.html',
  styleUrls: ['./assign-user-to-project-modal.component.css']
})
export class AssignUserToProjectModalComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'projects_involved', 'actions'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = this.data.number + ' ' + this.data.name;

  /*
  Dwie (male) tabele;
  1. Z filtrem. Imie nazwisko, moze ilosc projektow. I z buttonem dodania lub odjecia.
  2. Lista userow w projekcie
  */
  constructor(private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: Project, private fb: FormBuilder) { }

  ngOnInit() {
    this.getUsersAssigned();
    this.getUsersNotAssigned();
  }

  getUsersAssigned() {
    this.projectService
      .getUsersAssignedToProject(this.data.projectId)
      .subscribe((usersAssigned) => {

      });
  }

  getUsersNotAssigned() {
    this.projectService
      .getUsersNotAssignedToProject(this.data.projectId)
      .subscribe((usersNotAssigned) => {
        this.dataSource = new MatTableDataSource(usersNotAssigned);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
