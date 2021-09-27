import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Workload } from 'src/app/_models/workload';
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

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private workloadService: WorkloadService,
    public dialogRef: MatDialogRef<NewWorkloadModalComponent>
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.newWorkloadForm = this.fb.group({
      projectId: ['']
    });
  }

  addWorkload() {
    this.workloadService.addWorkload(this.newWorkloadForm.value).subscribe(
      (response) => {
        this.toastr.success('Workload added');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Insertion error: ' + error);
      }
    );
  }

}
