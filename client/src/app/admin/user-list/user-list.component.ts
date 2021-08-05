import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/_models/appUser';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: AppUser[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;

  constructor(private usersService: UsersService, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUserList(this.userParams).subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadUsers();
  }

}
