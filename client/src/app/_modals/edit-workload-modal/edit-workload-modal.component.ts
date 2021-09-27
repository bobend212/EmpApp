import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/_models/project';
import { Workload } from 'src/app/_models/workload';

@Component({
  selector: 'app-edit-workload-modal',
  templateUrl: './edit-workload-modal.component.html',
  styleUrls: ['./edit-workload-modal.component.css']
})
export class EditWorkloadModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Workload) { }

  title = this.data.projectId

  ngOnInit(): void {
  }

}
