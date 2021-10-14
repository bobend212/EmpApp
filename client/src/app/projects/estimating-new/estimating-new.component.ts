import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-estimating-new',
  templateUrl: './estimating-new.component.html',
  styleUrls: ['./estimating-new.component.css']
})
export class EstimatingNewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  newEstimatingForm: FormGroup;
  selectedProject: Project;
  projects: Project[];
  project: Project;
  returnedProjectText = 'none';
  step = 0;

  panelsTotalEstim: number = 0;
  floorTotalEstim: number = 0;

  constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadProjects();
  }

  initializeForm() {
    this.newEstimatingForm = this.fb.group({
      panels: this.panelsTotalEstim,
      floor: this.floorTotalEstim,
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

  onSelectChange(selectedProjectId) {
    this.projectService.getProject(selectedProjectId).subscribe(project => {
      this.project = project;
      this.returnedProjectText = project.number + ' ' + project.name;
    })
  }

  calculatePanels(gfArea: number, gfFactor: number, ffArea: number, ffFactor: number, sfArea: number, sfFactor: number) {
    let calcGF = gfFactor * gfArea / 10 + 1;
    let calcFF = ffFactor * ffArea / 10 + 1;
    let calcSF = sfFactor * sfArea / 10 + 1;
    let totalPanels = Math.round(calcGF + calcFF + calcSF);

    this.panelsTotalEstim = totalPanels;
    this.newEstimatingForm.controls.panels.setValue(totalPanels);
  }

  calculateFloors(ffArea: number, ffFactor: number, sfArea: number, sfFactor: number, rArea: number, rFactor: number) {
    let calcFF = ffFactor * ffArea / 10 + 1;
    let calcSF = sfFactor * sfArea / 10 + 1;
    let calcR = rFactor * rArea / 10 + 1;
    let totalFloors = Math.round(calcFF + calcSF + calcR);

    this.floorTotalEstim = totalFloors;
    this.newEstimatingForm.controls.floor.setValue(totalFloors);
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

}
