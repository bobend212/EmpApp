import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/_models/appUser';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: AppUser;
  userId: number;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUserById();
  }

  loadUserById() {
    this.userId = this.usersService.userToGet;
    this.usersService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    })
  }

}
