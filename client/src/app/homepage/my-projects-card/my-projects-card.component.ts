import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AppUser } from 'src/app/_models/appUser';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-my-projects-card',
  templateUrl: './my-projects-card.component.html',
  styleUrls: ['./my-projects-card.component.css']
})
export class MyProjectsCardComponent implements OnInit {
  myProjects: Project[] = [];
  appUser: AppUser;
  user: User;

  constructor(private projectService: ProjectService, private accountService: AccountService, private usersService: UsersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.usersService.getUserByUsername(this.user.username).subscribe(appUser => {
      this.appUser = appUser;
      this.loadProjectsByAssignedUserId(appUser.id);
    });
  }

  loadProjectsByAssignedUserId(userId) {
    this.projectService.getProjectsByAssignedUserId(userId).subscribe(projects => {
      this.myProjects = projects.filter(x => x.status !== "Done");
    })
  }

}
