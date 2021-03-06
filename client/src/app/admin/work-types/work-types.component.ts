import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NewWorktypeModalComponent } from 'src/app/_modals/new-worktype-modal/new-worktype-modal.component';
import { WorkType } from 'src/app/_models/workType';
import { WorktypesService } from 'src/app/_services/worktypes.service';

@Component({
  selector: 'app-work-types',
  templateUrl: './work-types.component.html',
  styleUrls: ['./work-types.component.css']
})
export class WorkTypesComponent implements OnInit {
  worktypes: WorkType[] = [];
  displayedColumns: string[] = ['type', 'name', 'number'];
  dataSource: MatTableDataSource<WorkType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workTypesService: WorktypesService, private matDialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadWorktypes();
  }

  loadWorktypes() {
    this.workTypesService.getWorkTypes().subscribe(worktypes => {
      this.dataSource = new MatTableDataSource(worktypes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpenDialogNewWorkType() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    let dialog = this.matDialog.open(NewWorktypeModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadWorktypes();
    });
  }

}
