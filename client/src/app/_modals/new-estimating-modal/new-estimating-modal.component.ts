import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-new-estimating-modal',
  templateUrl: './new-estimating-modal.component.html',
  styleUrls: ['./new-estimating-modal.component.css']
})
export class NewEstimatingModalComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  newEstimatingForm: FormGroup;
  selectedProject: Project;
  projects: Project[];

  constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit() {
    this.initializeForm();
    this.loadProjects();
  }

  initializeForm() {
    this.newEstimatingForm = this.fb.group({
      panels: 0,
      floor: 0,
      roof: 0,
      steel: 0,
      douglasFirs: 0,
      gpFrames: 0,
      checking: 0,
      issuing: 0,
      slab: 0,
      sections: 0,
      other: 0,
      total: 0,
      issueDate: null,
      projectId: 0
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }


}
