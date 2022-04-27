import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {


    document.addEventListener('readystatechange', function () {
      if (document.readyState === 'complete') {
        init();
      }
    });

    function init() {
      const signInBtn = document.querySelector('.signinBtn');
      const signUpBtn = document.querySelector('.signupBtn');
      const formBx = document.querySelector('.formBx');
      const box = document.querySelector('.login-wrapper');

      if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
          formBx.classList.add('active');
          box.classList.add('active');
        });
      }
      if (signInBtn) {
        signInBtn.addEventListener('click', () => {
          formBx.classList.remove('active');
          box.classList.remove('active');
        });
      }
    }


  }
}
