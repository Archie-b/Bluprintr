import { Component } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-component-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
/** user-info component*/
export class UserInfoComponent {
  user: User;
  constructor(userService: UserService) {
    userService.get(JSON.parse(localStorage.getItem('token')).id).pipe(
      first())
      .subscribe(
        data => { 
          this.user = new User(data);
        },
        error => {
          console.log(error);
        });
  }
}
