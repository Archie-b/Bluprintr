import { Component } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-view-component-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
/** user-info component*/
export class UserInfoComponent {
  user: User;
  saved: boolean = false;
  error: boolean = false;
  count: number = 0;
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor(private userService: UserService, private projectService : ProjectService) {
    this.userService.get(JSON.parse(localStorage.getItem('token')).id).pipe(
      first())
      .subscribe(
        data => {
          this.user = new User(data);
          this.projectService.getForUser(this.user.Id).pipe(
              first())
            .subscribe(
              data => {
                this.count = data.length;
              },
              error => {
                console.log(error);
              });
        },
        error => {
          console.log(error);
        });
  }

  updatePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      this.user.Password = this.newPassword;
      this.userService.updatePassword(this.user).pipe(
          first())
        .subscribe(
          data => {
            this.user = new User(data);
            this.saved = true;
          },
          error => {
            console.log(error);
          });
    } else {
      this.error = true;
    }
  }
}
