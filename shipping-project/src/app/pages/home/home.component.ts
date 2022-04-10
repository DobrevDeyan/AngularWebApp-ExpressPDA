import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = this.userService.isLogged;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  myFunction(): void {}

  toggleInfo() {
    const element = document.getElementsByClassName('information')[0];
    setTimeout(() => {
      element.classList.toggle('active');
    }, 500);
  }
}
