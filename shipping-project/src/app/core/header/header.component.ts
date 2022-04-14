import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(public authService: AuthService) {}

  // loginHandler(): void {
  //   this.userService.login();
  // }

  // logOutHandler(): void {
  //   this.userService.logout();
  // }
}
