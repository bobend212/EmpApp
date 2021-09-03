import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;

  constructor(private projectService: ProjectService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    this.projectService.getProject(this.route.snapshot.paramMap.get('id')).subscribe(project => {
      this.project = project;
    })
  }

}
