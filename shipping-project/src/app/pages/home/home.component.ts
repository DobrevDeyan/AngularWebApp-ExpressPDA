import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = this.authService.isLoggedIn;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleInfo() {
    const element = document.getElementsByClassName('information')[0];
    setTimeout(() => {
      element.classList.toggle('active');
    }, 500);
  }
}
