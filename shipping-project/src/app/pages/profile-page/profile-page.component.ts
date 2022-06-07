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

  // proformas = [];

  ngOnInit(): void {}

  getProformas() {
    this.importProforma.getProformas();
  }

  closeProformaList() {
    //Removes the imported from DB proforma entries from the DOM
    const storedProformas = document.querySelector('#displayStoredProformas');
    storedProformas.innerHTML = '';
  }

  toggleProformaHistory: boolean = false;

  doToggle(): void {
    //Hide/Unhide users proformas
    this.toggleProformaHistory = !this.toggleProformaHistory;
    if (this.toggleProformaHistory) {
      this.getProformas();
    } else {
      this.closeProformaList();
    }
  }
}
