import { Component, OnInit } from '@angular/core';
import { ExportDataService } from 'src/app/services/export-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    public exportdataService: ExportDataService,
    public authService: AuthService
  ) {}

  proformas = [];

  ngOnInit(): void {}

  getProforma() {
    this.exportdataService.getProformas();
  }
}
