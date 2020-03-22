import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../shared/user';
@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: User;
  loading = false;
  returnUrl: string;
  error: boolean = false;
  signUpError = false;

  signingUp: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) {
    this.model = new User();
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model)
      .pipe(
        first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.error = true;
          this.loading = false;
        });
  }

  signUp() {
    this.loading = true;
    this.authenticationService.signUp(this.model)
      .pipe(
        first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.signUpError = true;
          this.loading = false;
        });
  }
}

