import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workload } from 'src/app/_models/workload';
import { WorkloadService } from 'src/app/_services/workload.service';

@Component({
  selector: 'app-project-workload',
  templateUrl: './project-workload.component.html',
  styleUrls: ['./project-workload.component.css']
})
export class ProjectWorkloadComponent implements OnInit {

  workloads: Workload[] = [];

  displayedColumns: string[] = ['projectNumber', 'projectName', 'orderPlaced', 'site', 'designInfo', 'drgsReceived', 'engReceived',
    'slabStage', 'bRegsStage', 'productionStage', 'issued', 'planner', 'estimDesignTime', 'slabRequired', 'slabEstimated', 'slabIssued',
    'bRegsRequired', 'bRegsEstimated', 'bRegsIssued', 'fullSetRequired', 'fullSetEstimated', 'fullSetIssued', 'issuingRequired', 'issuingEstimated', 'issuingIssued',
    'delivery', 'comments'];

  dataSource: MatTableDataSource<Workload>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workloadService: WorkloadService) { }

  ngOnInit() {
    this.loadWorkloads();
  }

  loadWorkloads() {
    this.workloadService.getAllWorkloads().subscribe(workloads => {
      this.dataSource = new MatTableDataSource(workloads);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
