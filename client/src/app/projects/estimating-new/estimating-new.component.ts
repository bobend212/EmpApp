import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/_models/project';
import { EstimatingService } from 'src/app/_services/estimating.service';
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
  roofTotalEstim: number = 0;
  steelTotalEstim: number = 0;
  dfTotalEstim: number = 0;
  gpfTotalEstim: number = 0;
  slabTotalEstim: number = 0;
  sectionsTotalEstim: number = 0;
  checkingTotalEstim: number = 0;
  issuingTotalEstim: number = 0;
  designEstim: number = 0;
  othersEstim: number = 0;
  totalEstim: number = 0;
  totalEstimDays: number = 0;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private toastr: ToastrService, private estimatingService: EstimatingService) { }

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
      roof: this.roofTotalEstim,
      steel: this.steelTotalEstim,
      douglasFirs: this.dfTotalEstim,
      gpFrames: this.gpfTotalEstim,
      checking: this.checkingTotalEstim,
      issuing: this.issuingTotalEstim,
      slab: this.slabTotalEstim,
      sections: this.sectionsTotalEstim,
      other: 0,
      total: this.totalEstim,
      projectId: 0
    });
  }

  onSelectChange(selectedProjectId) {
    if (selectedProjectId !== null) {
      this.projectService.getProject(selectedProjectId).subscribe(project => {
        console.log(selectedProjectId)
        this.project = project;
        this.returnedProjectText = project.number + ' ' + project.name;
      })
    }
    this.returnedProjectText = 'none';
  }

  calculatePanels(gfArea: number, gfFactor: number, ffArea: number, ffFactor: number, sfArea: number, sfFactor: number) {
    let calcGF = gfFactor * gfArea / 10 + 1;
    let calcFF = ffFactor * ffArea / 10 + 1;
    let calcSF = sfFactor * sfArea / 10 + 1;
    let totalPanels = Math.round(calcGF + calcFF + calcSF);

    this.panelsTotalEstim = totalPanels;
    this.newEstimatingForm.controls.panels.setValue(totalPanels);
    this.toastr.show('Panels calculated ' + this.panelsTotalEstim + 'h');
  }

  calculateFloors(ffArea: number, ffFactor: number, sfArea: number, sfFactor: number, rArea: number, rFactor: number) {
    let calcFF = ffFactor * ffArea / 10 + 1;
    let calcSF = sfFactor * sfArea / 10 + 1;
    let calcR = rFactor * rArea / 10 + 1;
    let totalFloors = Math.round(calcFF + calcSF + calcR);

    this.floorTotalEstim = totalFloors;
    this.newEstimatingForm.controls.floor.setValue(totalFloors);
    this.toastr.show('Floor calculated ' + this.floorTotalEstim + 'h');
  }

  calculateRoof(roofArea: number, roofFactor: number) {
    let calcRoof = roofFactor * roofArea / 10 + 1.5;
    let totalRoof = Math.round(calcRoof);

    this.roofTotalEstim = totalRoof;
    this.newEstimatingForm.controls.roof.setValue(totalRoof);
    this.toastr.show('Roof calculated: ' + this.roofTotalEstim + 'h');
  }

  calculateSteel(postsNo: number, postsFactor: number, beamsNo: number, beamsFactor: number, soNo: number, soFactor: number) {
    let calcPosts = postsFactor * postsNo + 0.5 * postsNo;
    let calcBeams = beamsNo * beamsFactor + 0.5 * beamsNo;
    let calcSo = soNo * soFactor + 0.5 * soNo;
    let totalSteel = Math.round(calcPosts + calcBeams + calcSo);

    this.steelTotalEstim = totalSteel;
    this.newEstimatingForm.controls.steel.setValue(totalSteel);
    this.toastr.show('Steel calculated ' + this.steelTotalEstim + 'h');
  }

  calculateDfirs(postsNo: number, postsFactor: number, beamsNo: number, beamsFactor: number, soNo: number, soFactor: number) {
    let calcPosts = postsFactor * postsNo + 0.5 * postsNo;
    let calcBeams = beamsNo * beamsFactor + 0.5 * beamsNo;
    let calcSo = soNo * soFactor + 0.5 * soNo;
    let totalDFirs = Math.round(calcPosts + calcBeams + calcSo);

    this.dfTotalEstim = totalDFirs;
    this.newEstimatingForm.controls.douglasFirs.setValue(totalDFirs);
    this.toastr.show('DF calculated ' + this.dfTotalEstim + 'h');
  }

  calculateGPF(gpfNo: number, gpfFactor: number) {
    let calcGPF = gpfFactor * gpfNo + 0.5 * gpfNo;
    let totalGPF = Math.round(calcGPF);

    this.gpfTotalEstim = totalGPF;
    this.newEstimatingForm.controls.gpFrames.setValue(totalGPF);
    this.toastr.show('GPF calculated: ' + this.gpfTotalEstim + 'h');
  }

  calculateSlab(slabArea: number, slabFactor: number) {
    let calcSlab = slabFactor * slabArea / 10 + 1;
    let totalSlab = Math.round(calcSlab);

    this.slabTotalEstim = totalSlab;
    this.newEstimatingForm.controls.slab.setValue(totalSlab);
    this.toastr.show('Slab calculated: ' + this.slabTotalEstim + 'h');
  }

  calculateSections(sectionsArea: number, sectionsFactor: number) {
    let calcSections = sectionsFactor * sectionsArea + 0.5 * sectionsArea;
    let totalSections = Math.round(calcSections);

    this.sectionsTotalEstim = totalSections;
    this.newEstimatingForm.controls.sections.setValue(totalSections);
    this.toastr.show('Sections calculated: ' + this.sectionsTotalEstim + 'h');
  }

  calculateTotals(other: string) {
    let designEstim = this.panelsTotalEstim + this.floorTotalEstim +
      this.roofTotalEstim + this.steelTotalEstim + this.dfTotalEstim + this.gpfTotalEstim + this.slabTotalEstim + this.sectionsTotalEstim;

    this.designEstim = designEstim;

    this.checkingTotalEstim = Math.round(designEstim * 0.1);
    this.issuingTotalEstim = Math.round(designEstim * 0.08);

    this.newEstimatingForm.controls.checking.setValue(this.checkingTotalEstim);
    this.newEstimatingForm.controls.issuing.setValue(this.issuingTotalEstim);
    this.newEstimatingForm.controls.other.setValue(parseInt(other));

    this.othersEstim = this.checkingTotalEstim + this.issuingTotalEstim + parseInt(other);

    this.totalEstim = this.designEstim + this.othersEstim;

    this.newEstimatingForm.controls.total.setValue(this.totalEstim);
    this.totalEstimDays = Math.round(this.totalEstim / 7.5 * 10) / 10;
    this.toastr.show('Estimating ready to create...');
  }

  loadProjects() {
    this.projectService.getProjectsWithoutEstimating().subscribe(projects => {
      this.projects = projects;
    })
  }

  createEstimating() {
    this.estimatingService.addEstimating(this.newEstimatingForm.value).subscribe(
      (response) => {
        this.toastr.success('Estimating added to the DB');
      },
      (error) => {
        this.toastr.error('Insert error: ' + error.error);
      }
    );
  }

}
