import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/_models/appUser';
import { UsersService } from 'src/app/_services/users.service';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/_services/project.service';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: AppUser;
  userId: number;
  projectsCurrent: Project[] = [];
  projectsDone: Project[] = [];

  constructor(private usersService: UsersService, private _location: Location, private projectsService: ProjectService) { }

  ngOnInit(): void {
    this.loadUserById();
    this.loadProjectsByAssignedUserId();
  }

  loadUserById() {
    this.userId = this.usersService.userToGet;
    this.usersService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    })
  }

  loadProjectsByAssignedUserId() {
    this.projectsService.getProjectsByAssignedUserId(this.userId).subscribe(projects => {
      this.projectsCurrent = projects.filter(x => x.status !== "Done");
      this.projectsDone = projects.filter(x => x.status === "Done");
    })

  }

  back(): void {
    this._location.back();
  }

}
