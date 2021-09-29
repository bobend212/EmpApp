import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/_models/project';
import { Workload } from 'src/app/_models/workload';
import { ProjectService } from 'src/app/_services/project.service';
import { WorkloadService } from 'src/app/_services/workload.service';

@Component({
  selector: 'app-new-workload-modal',
  templateUrl: './new-workload-modal.component.html',
  styleUrls: ['./new-workload-modal.component.css']
})
export class NewWorkloadModalComponent implements OnInit {
  newWorkloadForm: FormGroup;
  workloads: Workload[];
  dataSource: any;
  title: string = 'New Workload';

  selectedProject: Project;
  projects: Project[];

  sites: any[] = [
    { siteName: 'SB' },
    { siteName: 'KTS' },
    { siteName: 'Ext.' },
  ]

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private workloadService: WorkloadService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<NewWorkloadModalComponent>
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadProjects();
  }

  initializeForm() {
    this.newWorkloadForm = this.fb.group({
      projectId: [''],
      site: [null],
      issued: [false],
      orderPlaced: [''],
      delivery: [''],
      designInfo: [''],
      planner: [''],
      estimDesignTime: [0],
      drgsReceived: [false],
      engReceived: [false],
      slabStage: [''],
      bRegsStage: [''],
      productionStage: [''],
      slabRequired: [''],
      slabEstimated: [''],
      slabIssued: [''],
      bRegsRequired: [''],
      bRegsEstimated: [''],
      bRegsIssued: [''],
      fullSetRequired: [''],
      fullSetEstimated: [''],
      fullSetIssued: [''],
      issuingRequired: [''],
      issuingEstimated: [''],
      issuingIssued: [''],
      comments: ['']
    });
  }

  addWorkload() {
    this.workloadService.addWorkload(this.newWorkloadForm.value).subscribe(
      (response) => {
        this.toastr.success('Workload added');
        this.dialogRef.close();
      },
      (error) => {
        console.log(error.error)
        console.log(error)
        console.log(this.newWorkloadForm.value)
        this.toastr.error('Insertion error: ' + error);
      }
    );
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

}

interface Country {
  name: string,
  code: string
}
