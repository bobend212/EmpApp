import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.css']
})
export class HomeLoggedComponent implements OnInit {
  todayDate = new Date();
  todayFormattedDate = moment(this.todayDate).format('dddd, Do MMMM YYYY');

  constructor() { }

  ngOnInit(): void {
  }

}
