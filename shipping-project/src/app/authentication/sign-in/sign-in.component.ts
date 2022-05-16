import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css', '../../../assets/css/auth.css'],
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit() {}
}
