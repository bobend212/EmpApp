import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit {
  newProjectForm: FormGroup;
  projects: Project[];
  dataSource: any;
  title: string = 'New Project';

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<NewProjectModalComponent>
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.newProjectForm = this.fb.group({
      number: [''],
      name: ['']
    });
  }

  addProject() {
    this.projectService.addProject(this.newProjectForm.value).subscribe(
      (response) => {
        this.toastr.success('Project added');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Project not added');
      }
    );
  }



}
