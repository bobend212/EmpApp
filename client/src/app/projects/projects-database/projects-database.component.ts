import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/_models/pagination';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-database',
  templateUrl: './projects-database.component.html',
  styleUrls: ['./projects-database.component.css']
})
export class ProjectsDatabaseComponent implements OnInit {
  projects: Project[] = [];
  pagination: Pagination;
  userParams: UserParams;
  user: User;

  constructor(private projectService: ProjectService, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit() {
    this.loadProjectsDatabase();
  }

  loadProjectsDatabase() {
    this.projectService
      .getProjectsWithPagination(this.userParams)
      .subscribe((projects) => {
        this.projects = projects.result;
        this.pagination = projects.pagination;
      });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadProjectsDatabase();
  }


}
