import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/_models/appUser';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {
  editTaskForm: FormGroup;
  tasks: Task[];
  title: string = 'Edit Task';

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

  taskNames: any[] = [
    { name: 'Panels' },
    { name: 'Floor' },
    { name: 'Roof' },
    { name: 'Sections' },
    { name: 'Slab' },
    { name: 'Steel' },
    { name: 'Issuing' },
    { name: 'Checking' },
    { name: 'GF Portal' },
    { name: 'DF Posts & Beams' },
    { name: 'Other' }
  ];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.editTaskForm = this.fb.group({
      name: this.data.name,
      estimatedTime: this.data.estimatedTime,
      itemStage: this.data.itemStage
    });
  }

  editTask() {
    this.tasksService
      .editTask(this.data.taskItemId, this.editTaskForm.value)
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
