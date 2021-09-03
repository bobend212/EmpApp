import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NewProjectModalComponent } from 'src/app/_modals/new-project-modal/new-project-modal.component';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-database',
  templateUrl: './projects-database.component.html',
  styleUrls: ['./projects-database.component.css']
})
export class ProjectsDatabaseComponent implements OnInit {
  projects: Project[] = [];
  user: User;

  displayedColumns: string[] = ['number', 'name', 'create', 'update', 'actions'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectService: ProjectService, private matDialog: MatDialog, private toastr: ToastrService) { }

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

  onOpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.data = this.projects;
    let dialog = this.matDialog.open(NewProjectModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadProjectsDatabase();
    });
  }

  removeProject(project) {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(project.projectId).subscribe(() => {
        this.loadProjectsDatabase();
        this.toastr.success("Project removed")
      })
    }
  }


}
