import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NewEstimatingModalComponent } from 'src/app/_modals/new-estimating-modal/new-estimating-modal.component';
import { Estimating } from 'src/app/_models/estimating';
import { EstimatingService } from 'src/app/_services/estimating.service';

@Component({
  selector: 'app-projects-estimations',
  templateUrl: './projects-estimations.component.html',
  styleUrls: ['./projects-estimations.component.css']
})
export class ProjectsEstimationsComponent implements OnInit {
  estimations: Estimating[] = [];

  displayedColumns: string[] = [
    'project',
    'panels',
    'floor',
    'roof',
    'steel',
    'douglasFirs',
    'gpFrames',
    'checking',
    'issuing',
    'slab',
    'sections',
    'other',
    'total',
    'dates',
    'authors',
    'actions'
  ];

  dataSource: MatTableDataSource<Estimating>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estimatingService: EstimatingService, private matDialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadAllEstimatings();
  }

  loadAllEstimatings() {
    this.estimatingService
      .getAllEstimations()
      .subscribe((estimations) => {
        this.dataSource = new MatTableDataSource(estimations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newEstimatingOpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    //dialogConfig.data = this.projects;
    let dialog = this.matDialog.open(NewEstimatingModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadAllEstimatings();
    });
  }

}
