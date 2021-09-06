import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { EditProjectModalComponent } from '../edit-project-modal/edit-project-modal.component';

@Component({
  selector: 'app-edit-project-stage-modal',
  templateUrl: './edit-project-stage-modal.component.html',
  styleUrls: ['./edit-project-stage-modal.component.css']
})
export class EditProjectStageModalComponent implements OnInit {
  editProjectStageForm: FormGroup;
  title: string = 'Edit Project Stage';

  stages: any[] = [
    'To be done',
    'Design done',
    'Design being checked',
    'Design checked',
    'Design being amended',
    'Design checked - ready for issuing',
    'Being issued',
    'Done & Issued'
  ];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<EditProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.editProjectStageForm = this.fb.group({
      stage: [this.data.stage]
    });
  }

  editProjectStage() {
    this.projectService
      .editProjectStage(this.data.projectId, this.editProjectStageForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('Project stage updated');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Update stage error: ' + error);
        }
      );
  }

}
