import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/_models/task';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-edit-task-stage-modal',
  templateUrl: './edit-task-stage-modal.component.html',
  styleUrls: ['./edit-task-stage-modal.component.css']
})
export class EditTaskStageModalComponent implements OnInit {
  editTaskStageForm: FormGroup;
  title: string = 'Edit Task Stage';

  stages: any[] = [
    { stageName: 'To be done' },
    { stageName: 'Design done' },
    { stageName: 'Design being checked' },
    { stageName: 'Design checked' },
    { stageName: 'Design being amended' },
    { stageName: 'Design checked - ready for issuing' },
    { stageName: 'Being issued' },
    { stageName: 'Done & Issued' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<EditTaskStageModalComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.editTaskStageForm = this.fb.group({
      itemStage: this.data.itemStage
    });
  }

  editTaskStage() {
    this.tasksService
      .editTaskStage(this.data.taskItemId, this.editTaskStageForm.value)
      .subscribe(
        () => {
          this.toastr.success('Task updated');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Update error: ' + error.error);
        }
      );
  }

}
