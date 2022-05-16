import { Injectable } from '@angular/core';
import {
  doc,
  setDoc,
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ImportUserProformasService {
  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  async getProformas() {
    let db = getFirestore();
    const storedProformas = document.querySelector('#displayStoredProformas');
    const q = query(
      collection(db, 'proformas'),
      where('uid', '==', this.authService.userData.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      renderProformas(doc);
    });

    function renderProformas(doc) {
      let ul = document.createElement('ul');
      let type = document.createElement('li');
      let tonnage = document.createElement('li');
      let hours = document.createElement('li');
      let length = document.createElement('li');
      let operations = document.createElement('li');
      let state = document.createElement('li');
      // let deleteProformaButton = document.createElement('');

      ul.style.border = '2px solid white';
      ul.style.borderRadius = '10px';
      ul.style.margin = '10px 0';
      ul.style.minWidth = '100%';
      ul.style.padding = '15px 15px';
      ul.style.background = 'black';
      ul.style.display = 'flex';
      type.style.marginRight = '20px';
      tonnage.style.marginRight = '20px';
      hours.style.marginRight = '20px';
      length.style.marginRight = '20px';
      operations.style.marginRight = '20px';
      state.style.marginRight = '20px';

      type.textContent = 'Vessel type: ' + doc.data().vesselType + '; ';
      operations.textContent =
        'Operations type: ' + doc.data().operations + '; ';
      state.textContent = 'Special state: ' + doc.data().specialState + '; ';
      tonnage.textContent = 'Gross Tonnage: ' + doc.data().grossTonnage + '; ';
      length.textContent =
        'Length over all: ' + doc.data().lengthOverall + '; ';
      hours.textContent = 'Hours at berth: ' + doc.data().hoursAtBerth + '; ';

      ul.appendChild(type);
      ul.appendChild(operations);
      ul.appendChild(state);
      ul.appendChild(tonnage);
      ul.appendChild(length);
      ul.appendChild(hours);

      storedProformas.appendChild(ul);
    }

    const hideButton = document.querySelector('.button-style');
    (hideButton as HTMLElement).style.display = 'none';
    // const hidePara = document.querySelector('.para'); Element removed currently
    // (hidePara as HTMLElement).style.display = 'none';
  }
}
