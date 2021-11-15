import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { EditTaskStageModalComponent } from 'src/app/_modals/edit-task-stage-modal/edit-task-stage-modal.component';
import { AppUser } from 'src/app/_models/appUser';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TasksService } from 'src/app/_services/tasks.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-my-tasks-card',
  templateUrl: './my-tasks-card.component.html',
  styleUrls: ['./my-tasks-card.component.css']
})
export class MyTasksCardComponent implements OnInit {
  myTasks: Task[] = [];
  appUser: AppUser;
  user: User;

  constructor(private taskService: TasksService, private accountService: AccountService, private usersService: UsersService, private matDialog: MatDialog) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.usersService.getUserByUsername(this.user.username).subscribe(appUser => {
      this.appUser = appUser;
      this.loadTasksByLoggedUserId(appUser.id)
    });
  }

  loadTasksByLoggedUserId(userId) {
    this.taskService.getTasksByUserId(userId).subscribe(myTasks => {
      this.myTasks = myTasks.filter(x => x.itemStage !== "Done & Issued");
    })
  }

  editTaskStageOpenDialog(task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";

    dialogConfig.data = task;
    let dialog = this.matDialog.open(EditTaskStageModalComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.loadUserData();
    });
  }

}
