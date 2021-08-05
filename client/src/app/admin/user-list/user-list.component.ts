import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/_models/appUser';
import { Pagination } from 'src/app/_models/pagination';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: AppUser[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUserList(this.pageNumber, this.pageSize).subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadUsers();
  }

}
