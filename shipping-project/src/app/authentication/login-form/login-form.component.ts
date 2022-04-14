import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  // loginFormGroup: FormGroup = this.formBuilder.group({
  //   email: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(6),
  //   ]),
  // });
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  //   private userService: UserService
  // ) {}
  // ngOnInit(): void {}
  // loginHandler(): void {
  //   // this.userService.login();
  //   // this.router.navigate(['/home']);
  //   console.log('form is submitted', this.loginFormGroup);
  // }
  // handleLogin(): void {
  //   console.log('form must be submitted');
  // }
  // isSignedIn = false;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
