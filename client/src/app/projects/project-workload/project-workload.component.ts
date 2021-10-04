import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EditWorkloadModalComponent } from 'src/app/_modals/edit-workload-modal/edit-workload-modal.component';
import { NewWorkloadModalComponent } from 'src/app/_modals/new-workload-modal/new-workload-modal.component';
import { Workload } from 'src/app/_models/workload';
import { WorkloadService } from 'src/app/_services/workload.service';

@Component({
  selector: 'app-project-workload',
  templateUrl: './project-workload.component.html',
  styleUrls: ['./project-workload.component.css']
})
export class ProjectWorkloadComponent implements OnInit {

  workloads: Workload[] = [];

  displayedColumns: string[] = ['projectNumber', 'projectName', 'actions', 'issued', 'orderPlaced', 'site', 'designInfo', 'drgsReceived', 'engReceived',
    'slabStage', 'bRegsStage', 'productionStage', 'planner', 'estimDesignTime', 'slabRequired', 'slabEstimated', 'slabIssued',
    'bRegsRequired', 'bRegsEstimated', 'bRegsIssued', 'fullSetRequired', 'fullSetEstimated', 'fullSetIssued', 'issuingRequired', 'issuingEstimated', 'issuingIssued',
    'delivery', 'comments'];

  dataSource: MatTableDataSource<Workload>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workloadService: WorkloadService, private matDialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadWorkloadsActive();
  }

  loadWorkloadsActive() {
    this.workloadService.getAllWorkloadsActive().subscribe(workloads => {
      this.dataSource = new MatTableDataSource(workloads);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  loadAllWorkloads() {
    this.workloadService.getAllWorkloads().subscribe(workloads => {
      this.dataSource = new MatTableDataSource(workloads);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  loadWorkloadsIssued() {
    this.workloadService.getAllWorkloadsIssued().subscribe(workloads => {
      this.dataSource = new MatTableDataSource(workloads);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  showActiveWorkloads() {
    this.loadWorkloadsActive();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newWorkloadDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    //dialogConfig.data = this.projects;
    let dialog = this.matDialog.open(NewWorkloadModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadWorkloadsActive();
    });
  }

  editWorkloadDialog(workload) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.data = workload;
    let dialog = this.matDialog.open(EditWorkloadModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadWorkloadsActive();
    });
  }

}
