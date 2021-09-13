import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AssignUserToProjectModalComponent } from 'src/app/_modals/assign-user-to-project-modal/assign-user-to-project-modal.component';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-teams',
  templateUrl: './projects-teams.component.html',
  styleUrls: ['./projects-teams.component.css']
})
export class ProjectsTeamsComponent implements OnInit {
  projects: Project[] = [];
  user: User;

  displayedColumns: string[] = ['show', 'number', 'name', 'stage', 'status', 'team', 'actions'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectService: ProjectService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.loadProjectsDatabase();
  }

  loadProjectsDatabase() {
    this.projectService
      .getProjects()
      .subscribe((projects) => {
        this.dataSource = new MatTableDataSource(projects);
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

  assignUserToProject(project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.data = project;
    dialogConfig.height = '800px';

    let dialog = this.matDialog.open(AssignUserToProjectModalComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.loadProjectsDatabase();
    });
  }

}
