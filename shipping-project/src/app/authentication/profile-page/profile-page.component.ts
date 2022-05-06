import { Component, OnInit } from '@angular/core';
import { ImportUserProformasService } from 'src/app/services/import-user-proformas.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    public importProforma: ImportUserProformasService,
    public authService: AuthService
  ) {}

  proformas = [];

  ngOnInit(): void {}

  getProforma() {
    this.importProforma.getProformas();
  }
}
