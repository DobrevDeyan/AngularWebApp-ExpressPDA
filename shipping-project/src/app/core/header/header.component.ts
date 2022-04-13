import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(public userService: UserService) {}

  loginHandler(): void {
    this.userService.login();
  }

  logOutHandler(): void {
    this.userService.logout();
  }
}
