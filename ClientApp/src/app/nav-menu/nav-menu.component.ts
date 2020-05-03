import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loggedIn = false;

  constructor(private userService: UserService) {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.userService.logout();
    window.location.href = '/';
  }
}
