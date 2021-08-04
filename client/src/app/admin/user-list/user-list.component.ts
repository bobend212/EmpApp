import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/_models/appUser';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: AppUser[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUserList().subscribe(users => {
      this.users = users;
    })
  }

}
