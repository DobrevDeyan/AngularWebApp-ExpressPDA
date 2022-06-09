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
  updateDoc,
  deleteField,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DeleteProformaEntryService {
  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  async deleteProforma() {
    alert(1);
  }
}
