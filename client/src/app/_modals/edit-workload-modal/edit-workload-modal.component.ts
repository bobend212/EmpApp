import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Project } from 'src/app/_models/project';
import { Workload } from 'src/app/_models/workload';
import { ProjectService } from 'src/app/_services/project.service';
import { WorkloadService } from 'src/app/_services/workload.service';

@Component({
  selector: 'app-edit-workload-modal',
  templateUrl: './edit-workload-modal.component.html',
  styleUrls: ['./edit-workload-modal.component.css']
})
export class EditWorkloadModalComponent implements OnInit {
  editWorkloadForm: FormGroup;
  selectedProject: Project;
  projects: Project[];


  sites: any[] = [
    { siteName: 'SB' },
    { siteName: 'KTS' },
    { siteName: 'Ext.' },
  ]

  stages: any[] = [
    { stageName: 'NOT STARTED' },
    { stageName: 'IN PROGRESS' },
    { stageName: 'COMPLETED' },
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: Workload,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private workloadService: WorkloadService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<EditWorkloadModalComponent>
  ) { }

  title = this.data.projectNumber + ' ' + this.data.projectName + ' - Workload';

  ngOnInit() {
    this.initializeForm();
    this.loadProjects();
  }

  initializeForm() {
    this.editWorkloadForm = this.fb.group({
      workloadId: this.data.workloadId,
      site: this.data.site,
      issued: this.data.issued,
      orderPlaced: this.data.orderPlaced,
      delivery: this.data.delivery,
      designInfo: this.data.designInfo,
      planner: this.data.planner,
      estimDesignTime: this.data.estimDesignTime,
      drgsReceived: this.data.drgsReceived,
      engReceived: this.data.engReceived,
      slabStage: this.data.slabStage,
      bRegsStage: this.data.bRegsStage,
      productionStage: this.data.productionStage,
      slabRequired: this.data.slabRequired,
      slabEstimated: this.data.slabEstimated,
      slabIssued: this.data.slabIssued,
      bRegsRequired: this.data.bRegsRequired,
      bRegsEstimated: this.data.bRegsEstimated,
      bRegsIssued: this.data.bRegsIssued,
      fullSetRequired: this.data.fullSetRequired,
      fullSetEstimated: this.data.fullSetEstimated,
      fullSetIssued: this.data.fullSetIssued,
      issuingRequired: this.data.issuingRequired,
      issuingEstimated: this.data.issuingEstimated,
      issuingIssued: this.data.issuingIssued,
      comments: this.data.comments
    });
  }

  editWorkload() {
    this.workloadService
      .editWorkload(this.data.workloadId, this.editWorkloadForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('Workload updated');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Update error: ' + error.error);
        }
      );
  }

  removeWrokload(workloadId) {
    if (confirm('Are you sure?')) {
      this.workloadService.deleteWorkload(workloadId).subscribe(() => {
        this.toastr.success('Workload removed');
        this.dialogRef.close();
      },
        (error) => {
          this.toastr.error('Error: ' + error.error);
        })
    }
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

  clearForm() {
    this.editWorkloadForm = this.fb.group({
      workloadId: this.data.workloadId,
      site: '',
      issued: false,
      orderPlaced: null,
      delivery: null,
      designInfo: '',
      planner: '',
      estimDesignTime: 0,
      drgsReceived: false,
      engReceived: false,
      slabStage: '',
      bRegsStage: '',
      productionStage: '',
      slabRequired: null,
      slabEstimated: null,
      slabIssued: null,
      bRegsRequired: null,
      bRegsEstimated: null,
      bRegsIssued: null,
      fullSetRequired: null,
      fullSetEstimated: null,
      fullSetIssued: null,
      issuingRequired: null,
      issuingEstimated: null,
      issuingIssued: null,
      comments: ''
    });
  }

}
