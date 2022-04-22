import { Injectable } from '@angular/core';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { stringify } from 'querystring';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExportDataService {
  constructor(public authService: AuthService) {
    this.authService = authService;
  }
  async exportProforma(options: any) {
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
  createDocName(s): string {
    var a = 1,
      c = 0,
      h,
      o;
    if (s) {
      a = 0;
      /*jshint plusplus:false bitwise:false*/
      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        a = ((a << 6) & 268435455) + o + (o << 14);
        c = a & 266338304;
        a = c !== 0 ? a ^ (c >> 21) : a;
      }
    }
    return String(a);
  }
  async getProformas(uid: string) {}
}
