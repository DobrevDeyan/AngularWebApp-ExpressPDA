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

    const q = query(
      collection(db, 'proformas'),
      where('uid', '==', this.authService.userData.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
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
