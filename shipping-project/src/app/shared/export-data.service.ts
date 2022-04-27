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
import { Proforma } from './proforma';

@Injectable({
  providedIn: 'root',
})
export class ExportDataService {
  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  async exportProforma(options: Proforma) {
    let docName =
      this.authService.userData.uid +
      options.vesselType +
      options.operations +
      options.specialState +
      options.grossTonnage +
      options.lengthOverall +
      options.hoursAtBerth;

    let db = getFirestore();
    let hashedDocName = this.createDocName(docName);

    await setDoc(doc(db, 'proformas', hashedDocName), {
      vesselType: options.vesselType,
      operations: options.operations,
      specialState: options.specialState,
      grossTonnage: options.grossTonnage,
      lengthOverall: options.lengthOverall,
      hoursAtBerth: options.hoursAtBerth,
      uid: this.authService.userData.uid,
    });
  }

  async getProformas() {
    let db = getFirestore();
    const storedProformas = document.querySelector('#displayStoredProformas');
    const q = query(
      collection(db, 'proformas'),
      where('uid', '==', this.authService.userData.uid)
    );

    function renderProformas(doc) {
      let li = document.createElement('li');
      let type = document.createElement('span');
      let tonnage = document.createElement('span');
      let hours = document.createElement('span');
      let length = document.createElement('span');
      let operations = document.createElement('span');
      let state = document.createElement('span');

      type.textContent = doc.data().vesselType;
      operations.textContent = doc.data().operations;
      state.textContent = doc.data().specialState;
      tonnage.textContent = doc.data().grossTonnage;
      length.textContent = doc.data().lengthOverall;
      hours.textContent = doc.data().hoursAtBerth;

      li.appendChild(type);
      li.appendChild(operations);
      li.appendChild(state);
      li.appendChild(tonnage);
      li.appendChild(length);
      li.appendChild(hours);

      storedProformas.appendChild(li);
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      renderProformas(doc);
    });
  }

  createDocName(s: string) {
    var a = 1,
      c = 0,
      h,
      o;
    if (s) {
      a = 0;
      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        a = ((a << 6) & 268435455) + o + (o << 14);
        c = a & 266338304;
        a = c !== 0 ? a ^ (c >> 21) : a;
      }
    }
    return String(a);
  }
}
