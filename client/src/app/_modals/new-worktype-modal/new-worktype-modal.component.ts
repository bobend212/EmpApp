import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WorktypesService } from 'src/app/_services/worktypes.service';

@Component({
  selector: 'app-new-worktype-modal',
  templateUrl: './new-worktype-modal.component.html',
  styleUrls: ['./new-worktype-modal.component.css']
})
export class NewWorktypeModalComponent implements OnInit {
  newWorkTypeForm: FormGroup;

  types: any[] = [
    { name: 'Productive' },
    { name: 'Non-Productive' }
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<NewWorktypeModalComponent>, private worktypesService: WorktypesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.newWorkTypeForm = this.fb.group({
      workTypeName: '',
      type: 'Productive',
      workTypeNumber: ''
    });
  }

  addWorkType() {
    this.worktypesService.addWorkType(this.newWorkTypeForm.value).subscribe(
      () => {
        this.toastr.success('Worktype added');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Insert error: ' + error.error);
      }
    );
  }

}
