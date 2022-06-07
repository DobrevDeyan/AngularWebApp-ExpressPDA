import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  doc,
  setDoc,
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DeleteProformaEntryService {
  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  async deleteProforma() {
    let target = document.querySelector('.remove-proforma');

    console.log(target);
    //Delete individual proforma entry: removing it from the DOM; removing it from DB
    // let db = getFirestore();
    // const storedProformas = document.querySelector('#displayStoredProformas');
    // const q = query(
    //   collection(db, 'proformas'),
    //   where('uid', '==', this.authService.userData.uid)
    // );
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // console.log(doc);
    // });
  }
}

// async exportProforma(options: Proforma) {
//   let docName =
//     this.authService.userData.uid +
//     options.vesselType +
//     options.operations +
//     options.specialState +
//     options.grossTonnage +
//     options.lengthOverall +
//     options.hoursAtBerth;

//   let db = getFirestore();
//   let hashedDocName = this.createDocName(docName);

//   await setDoc(doc(db, 'proformas', hashedDocName), {
//     vesselType: options.vesselType,
//     operations: options.operations,
//     specialState: options.specialState,
//     grossTonnage: options.grossTonnage,
//     lengthOverall: options.lengthOverall,
//     hoursAtBerth: options.hoursAtBerth,
//     uid: this.authService.userData.uid,
//   });
// }
