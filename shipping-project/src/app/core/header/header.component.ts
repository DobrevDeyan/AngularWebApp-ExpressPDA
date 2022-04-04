import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {}

  loginHandler(): void {
    this.userService.login();
  }

  logOutHandler(): void {
    this.userService.logout();
  }
}
