import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { UserService } from 'src/app/services/user.service';

// rename data-service to firebase-service
// import firebase-service
// create function in furebase-service to get all proformas by uid
// call getProformas(uid)

// import authService (like in export-data)

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    public authService: AuthService // public userService: UserService
  ) {}

  proformas = [];

  ngOnInit(): void {
    // get uid from authService ...  this.authService.userData.uid
    // call getProformas(uid)
    // store the proformas in this.proformas
    // in the html print the this.proformas array
  }
}
