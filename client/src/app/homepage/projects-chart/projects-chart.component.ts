import { Component, OnInit } from '@angular/core';
import { WorkloadService } from 'src/app/_services/workload.service';

@Component({
  selector: 'app-projects-chart',
  templateUrl: './projects-chart.component.html',
  styleUrls: ['./projects-chart.component.css']
})
export class ProjectsChartComponent implements OnInit {
  chartData: any;
  data: any;

  constructor(private workloadService: WorkloadService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.workloadService.getAllWorkloadsChartData().subscribe(data => {
      this.data = data;

      this.chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          type: 'line',
          label: 'Goal',
          backgroundColor: '#120000',
          data: [3, 5, 6, 8, 10, 2, 5, 7, 9, 5, 6, 4]
        }, {
          type: 'bar',
          label: 'Required',
          backgroundColor: '#66BB6A',
          data: this.data.required
        }, {
          type: 'bar',
          label: 'Estimated',
          backgroundColor: '#FFA726',
          data: this.data.estimated
        }, {
          type: 'bar',
          label: 'Delivered',
          backgroundColor: '#2596be',
          data: this.data.delivered
        }]
      };
    })
  }
}
