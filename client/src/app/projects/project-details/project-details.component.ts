import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditProjectModalComponent } from 'src/app/_modals/edit-project-modal/edit-project-modal.component';
import { EditProjectStageModalComponent } from 'src/app/_modals/edit-project-stage-modal/edit-project-stage-modal.component';
import { Estimating } from 'src/app/_models/estimating';
import { Project } from 'src/app/_models/project';
import { EstimatingService } from 'src/app/_services/estimating.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  estimating: Estimating;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private matDialog: MatDialog,
    private estimatingsService: EstimatingService
  ) { }

  ngOnInit(): void {
    this.loadProject();
    this.loadEstimating();
  }

  loadProject() {
    this.projectService.getProject(this.route.snapshot.paramMap.get('id')).subscribe(project => {
      this.project = project;
    })
  }

  loadEstimating() {
    this.estimatingsService.getEstimatingByProjectId(this.route.snapshot.paramMap.get('id')).subscribe(estimating => {
      this.estimating = estimating;
    })
  }

  removeProject(project) {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(project.projectId).subscribe(() => {
        this.toastr.success('Project {' + project.number + ' ' + project.name + '} removed');
        this.router.navigateByUrl('/projects-database');
      })
    }
  }

  editProject(project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.data = project;

    let dialog = this.matDialog.open(EditProjectModalComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.loadProject();
    });
  }

  editProjectStage(project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.data = project;

    let dialog = this.matDialog.open(EditProjectStageModalComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.loadProject();
    });
  }

}
