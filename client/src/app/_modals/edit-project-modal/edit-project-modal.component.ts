import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit {
  editProjectForm: FormGroup;
  title: string = 'Edit Project';

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
    this.editProjectForm = this.fb.group({
      number: [this.data.number],
      name: [this.data.name],
      stage: [this.data.stage],
      plot: [this.data.plot],
      block: [this.data.block],
      site: [this.data.site],
      comments: [this.data.comments]
    });
  }

  editProject() {
    this.projectService
      .editProject(this.data.projectId, this.editProjectForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('Project updated');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Update error: ' + error.error);
        }
      );
  }

}
