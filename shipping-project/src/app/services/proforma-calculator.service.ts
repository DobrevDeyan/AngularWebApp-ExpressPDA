import { Injectable } from '@angular/core';
import { computedProforma } from '../interfaces/computedProforma';
import { Proforma } from '../interfaces/proforma';

@Injectable({
  providedIn: 'root',
})
export class ProformaCalculatorService {
  // configuration: Proforma;
  // computedProforma: computedProforma;
  computedProforma = {
    varnaEast: {
      tonnageDues: 0,
      berthDues: 0,
      pilotageIn: 0,
      pilotageOut: 0,
      towageIn: 0,
      towageOut: 0,
      mooring: 0,
      unmooring: 0,
      channelDues: 0,
      lightDues: 0,
      sailingPermission: 0,
      marpol: 0,
      total: 0,
    },
    varnaWest: {
      tonnageDues: 0,
      berthDues: 0,
      pilotageIn: 0,
      pilotageOut: 0,
      towageIn: 0,
      towageOut: 0,
      mooring: 0,
      unmooring: 0,
      channelDues: 0,
      lightDues: 0,
      sailingPermission: 0,
      marpol: 0,
      total: 0,
    },
  };
  constructor() {}

  calculateProforma(configuration: Proforma) {
    // ============================== VARNA EAST FORMULAS ============================== //
    // ===============  Tonnage dues ================= //

    if (configuration.vesselType == 'Tanker') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.5
      );
    } else if (configuration.vesselType == 'Container') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.55 * 0.6
      );
    } else if (configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.55 * 0.4
      );
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0
      );
    } else if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.05
      );
    } else {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.55
      );
    }

    // =============== Berth dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.berthDues = Math.round(
        configuration.lengthOverall * configuration.hoursAtBerth * 0.1 * 0.5 * 0
      );
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.berthDues = Math.round(
        configuration.lengthOverall * configuration.hoursAtBerth * 0.1 * 0
      );
    } else {
      this.computedProforma.varnaEast.berthDues = Math.round(
        configuration.lengthOverall * configuration.hoursAtBerth * 0.1
      );
    }

    // =============== Pilotage In dues ================= //

    if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall <= 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 0.9;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 0.9;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 0.9;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 0.9;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 0.9;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 0.9;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 0.9;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 0.9;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 0.9;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 0.9;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 0.9;
      }
    } else if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall > 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 0.8;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 0.8;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 0.8;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 0.8;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 0.8;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 0.8;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 0.8;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 0.8;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 0.8;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 0.8;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 0.8;
      }
    } else if (configuration.specialState == 'DG cargo in') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 1.5;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 1.5;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 1.5;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 1.5;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 1.5;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 1.5;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 1.5;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 1.5;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 1.5;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 1.5;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 1.5;
      }
    } else if (configuration.specialState == 'DG cargo out') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = 500 + b * 60;
      }
    }

    // =============== Pilotage Out dues ================= //

    if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall <= 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 0.9;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 0.9;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 0.9;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 0.9;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 0.9;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 0.9;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 0.9;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 0.9;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 0.9;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 0.9;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 0.9;
      }
    } else if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall > 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 0.8;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 0.8;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 0.8;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 0.8;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 0.8;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 0.8;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 0.8;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 0.8;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 0.8;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 0.8;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 0.8;
      }
    } else if (configuration.specialState == 'DG cargo out') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 1.5;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 1.5;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 1.5;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 1.5;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 1.5;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 1.5;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 1.5;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 1.5;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 1.5;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 1.5;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 1.5;
      }
    } else if (configuration.vesselType == 'DG cargo in/out') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = 500 + b * 60;
      }
    }

    // =============== Towage In dues ================= //

    if (configuration.vesselType == 'Passenger') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 420 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 620 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 820 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 1020 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 1220 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 1420 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 1620 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 1820 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 2020 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 2220 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (2200 + d * 55) * 0.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 840 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1240 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 1640 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 2040 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 2440 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 2840 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 3240 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 3640 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 4040 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 4440 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (4440 + d * 110) * 0.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 1260 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1860 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 2460 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 3060 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 3660 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 4260 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 4860 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 5460 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 6060 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 6660 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (6660 + d * 165) * 0.5;
        }
      }
    } else if (configuration.specialState == 'Overtime') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 420 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 620 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 820 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 1020 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 1220 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 1420 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 1620 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 1820 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 2020 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 2220 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (2200 + d * 55) * 1.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 840 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1240 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 1640 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 2040 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 2440 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 2840 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 3240 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 3640 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 4040 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 4440 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (4440 + d * 110) * 1.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 1260 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1860 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 2460 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 3060 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 3660 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 4260 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 4860 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 5460 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 6060 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 6660 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.towageIn = 420;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.towageIn = 620;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.towageIn = 820;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.towageIn = 1020;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.towageIn = 1220;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.towageIn = 1420;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.towageIn = 1620;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.towageIn = 1820;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.towageIn = 2020;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.towageIn = 2220;
      }
      if (configuration.grossTonnage > 10000) {
        const c = configuration.grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        this.computedProforma.varnaEast.towageIn = 2200 + d * 55;
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 840;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1240;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 1640;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 2040;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 2440;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 2840;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 3240;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 3640;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 4040;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 4440;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = 4440 + d * 110;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 1260;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1860;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 2460;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 3060;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 3660;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 4260;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 4860;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 5460;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 6060;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 6660;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = 6660 + d * 165;
        }
      }
    }

    // =============== Towage Out dues ================= //

    if (configuration.vesselType == 'Passenger') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 420 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 620 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 820 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 1020 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 1220 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 1420 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 1620 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 1820 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 2020 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 2220 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (2200 + d * 55) * 0.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 840 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1240 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 1640 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 2040 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 2440 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 2840 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 3240 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 3640 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 4040 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 4440 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (4440 + d * 110) * 0.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 1260 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1860 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 2460 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 3060 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 3660 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 4260 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 4860 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 5460 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 6060 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 6660 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (6660 + d * 165) * 0.5;
        }
      }
    } else if (configuration.specialState == 'Overtime') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 420 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 620 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 820 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 1020 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 1220 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 1420 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 1620 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 1820 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 2020 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 2220 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (2200 + d * 55) * 1.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 840 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1240 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 1640 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 2040 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 2440 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 2840 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 3240 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 3640 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 4040 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 4440 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (4440 + d * 110) * 1.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 1260 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1860 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 2460 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 3060 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 3660 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 4260 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 4860 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 5460 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 6060 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 6660 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 420;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 620;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 820;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 1020;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 1220;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 1420;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 1620;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 1820;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 2020;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 2220;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = 2200 + d * 55;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 840;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1240;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 1640;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 2040;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 2440;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 2840;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 3240;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 3640;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 4040;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 4440;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = 4440 + d * 110;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 1260;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1860;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 2460;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 3060;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 3660;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 4260;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 4860;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 5460;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 6060;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 6660;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = 6660 + d * 165;
        }
      }
    }

    // =============== Mooring dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.mooring = 0;
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.mooring = 60 * 1.5;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.mooring = 90 * 1.5;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.mooring = 120 * 1.5;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.mooring = 140 * 1.5;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.mooring = 160 * 1.5;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.mooring = 180 * 1.5;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.mooring = 200 * 1.5;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.mooring = 220 * 1.5;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.mooring = 230 * 1.5;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.mooring = 240 * 1.5;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.mooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.mooring = 60;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.mooring = 90;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.mooring = 120;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.mooring = 140;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.mooring = 160;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.mooring = 180;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.mooring = 200;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.mooring = 220;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.mooring = 230;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.mooring = 240;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.mooring = 240 + b * 35;
      }
    }

    // =============== Unmooring dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.unmooring = 0;
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.unmooring = 60 * 1.5;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.unmooring = 90 * 1.5;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.unmooring = 120 * 1.5;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.unmooring = 140 * 1.5;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.unmooring = 160 * 1.5;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.unmooring = 180 * 1.5;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.unmooring = 200 * 1.5;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.unmooring = 220 * 1.5;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.unmooring = 230 * 1.5;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.unmooring = 240 * 1.5;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.unmooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.unmooring = 60;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.unmooring = 90;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.unmooring = 120;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.unmooring = 140;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.unmooring = 160;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.unmooring = 180;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.unmooring = 200;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.unmooring = 220;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.unmooring = 230;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.unmooring = 240;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.unmooring = 240 + b * 35;
      }
    }

    // =============== Channel dues ================= //

    if (configuration.vesselType == 'Container') {
      this.computedProforma.varnaEast.channelDues = Math.round(
        configuration.grossTonnage * 0.04 * 0.25
      );
    } else if (configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaEast.channelDues = Math.round(
        configuration.grossTonnage * 0.04 * 0.5
      );
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.channelDues = Math.round(
        configuration.grossTonnage * 0.04 * 0
      );
    } else {
      this.computedProforma.varnaEast.channelDues = Math.round(
        configuration.grossTonnage * 0.04
      );
    }

    // =============== Light dues ================= //

    if (configuration.vesselType == 'Passenger') {
      if (configuration.grossTonnage <= 10) {
        this.computedProforma.varnaEast.lightDues = 5 * 0.5;
      }
      if (configuration.grossTonnage > 10 && configuration.grossTonnage <= 40) {
        this.computedProforma.varnaEast.lightDues = 10 * 0.5;
      }
      if (
        configuration.grossTonnage > 40 &&
        configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaEast.lightDues = 15 * 0.5;
      }
      if (
        configuration.grossTonnage > 500 &&
        configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaEast.lightDues = 40 * 0.5;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.lightDues = 70 * 0.5;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.lightDues = 110 * 0.5;
      }
      if (configuration.grossTonnage > 10000) {
        this.computedProforma.varnaEast.lightDues = 150 * 0.5;
      }
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.lightDues = 0;
    } else {
      if (configuration.grossTonnage <= 10) {
        this.computedProforma.varnaEast.lightDues = 5;
      }
      if (configuration.grossTonnage > 10 && configuration.grossTonnage <= 40) {
        this.computedProforma.varnaEast.lightDues = 10;
      }
      if (
        configuration.grossTonnage > 40 &&
        configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaEast.lightDues = 15;
      }
      if (
        configuration.grossTonnage > 500 &&
        configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaEast.lightDues = 40;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.lightDues = 70;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.lightDues = 110;
      }
      if (configuration.grossTonnage > 10000) {
        this.computedProforma.varnaEast.lightDues = 150;
      }
    }

    // =============== Sailing permission dues ================= //

    if (configuration.vesselType == 'navy') {
      this.computedProforma.varnaEast.sailingPermission = 0;
    } else {
      this.computedProforma.varnaEast.sailingPermission = 50;
    }

    // =============== Garbage/Marpol dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.marpol = 0;
    } else {
      if (configuration.grossTonnage <= 2000) {
        this.computedProforma.varnaEast.marpol = 65;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.marpol = 160;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.marpol = 210;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.marpol = 305;
      }
      if (
        configuration.grossTonnage > 10000 &&
        configuration.grossTonnage <= 20000
      ) {
        this.computedProforma.varnaEast.marpol = 365;
      }
      if (
        configuration.grossTonnage > 20000 &&
        configuration.grossTonnage <= 30000
      ) {
        this.computedProforma.varnaEast.marpol = 460;
      }
      if (
        configuration.grossTonnage > 30000 &&
        configuration.grossTonnage <= 40000
      ) {
        this.computedProforma.varnaEast.marpol = 735;
      }
      if (
        configuration.grossTonnage > 40000 &&
        configuration.grossTonnage <= 50000
      ) {
        this.computedProforma.varnaEast.marpol = 1140;
      }
      if (configuration.grossTonnage > 50000) {
        this.computedProforma.varnaEast.marpol = 1500;
      }
    }

    // =============== Gargo plan dues ================= // For future implementation

    // if (
    //   configuration.operations == 'Loading' &&
    //   configuration.vesselType == 'Container'
    // ) {
    //   this.computedProforma.varnaEast.cargoPlan = 50;
    // } else if (
    //   configuration.operations == 'Loading' &&
    //   configuration.specialState == 'Other'
    // ) {
    //   this.computedProforma.varnaEast.cargoPlan = 500;
    // } else {
    //   this.computedProforma.varnaEast.cargoPlan = 0;
    // }

    // =============== Booming dues ================= // For future implementation

    // this.computedProforma.varnaEast.booming = Math.round(
    //   100 + configuration.lengthOverall * 2.5 * 0.15 * configuration.hoursAtBerth
    // );

    this.computedProforma.varnaEast.total =
      this.computedProforma.varnaEast.tonnageDues +
      this.computedProforma.varnaEast.berthDues +
      this.computedProforma.varnaEast.pilotageIn +
      this.computedProforma.varnaEast.pilotageOut +
      this.computedProforma.varnaEast.towageIn +
      this.computedProforma.varnaEast.towageOut +
      this.computedProforma.varnaEast.mooring +
      this.computedProforma.varnaEast.unmooring +
      this.computedProforma.varnaEast.channelDues +
      this.computedProforma.varnaEast.lightDues +
      this.computedProforma.varnaEast.sailingPermission +
      this.computedProforma.varnaEast.marpol;

    // ============================== VARNA WEST FORMULAS ============================== //

    // ===============  Tonnage dues ================= //

    if (configuration.vesselType == 'Tanker') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.5
      );
    } else if (configuration.vesselType == 'Container') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.55 * 0.6
      );
    } else if (configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.55 * 0.4
      );
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0
      );
    } else if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.05
      );
    } else {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(configuration.grossTonnage) * 0.55
      );
    }

    // =============== Berth dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.berthDues = Math.round(
        configuration.lengthOverall * configuration.hoursAtBerth * 0.1 * 0.5 * 0
      );
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.berthDues = Math.round(
        configuration.lengthOverall * configuration.hoursAtBerth * 0.1 * 0
      );
    } else {
      this.computedProforma.varnaWest.berthDues = Math.round(
        configuration.lengthOverall * configuration.hoursAtBerth * 0.1
      );
    }

    // =============== Pilotage In dues ================= //

    if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall <= 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 0.9;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 0.9;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 0.9;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 0.9;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 0.9;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 0.9;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 0.9;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 0.9;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 0.9;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 0.9;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 0.9;
      }
    } else if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall > 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 0.8;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 0.8;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 0.8;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 0.8;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 0.8;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 0.8;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 0.8;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 0.8;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 0.8;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 0.8;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 0.8;
      }
    } else if (configuration.specialState == 'DG cargo in') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 1.5;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 1.5;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 1.5;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 1.5;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 1.5;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 1.5;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 1.5;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 1.5;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 1.5;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 1.5;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 1.5;
      }
    } else if (configuration.specialState == 'DG cargo out') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = 500 + b * 60;
      }
    }

    // =============== Pilotage Out dues ================= //

    if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall <= 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 0.9;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 0.9;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 0.9;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 0.9;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 0.9;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 0.9;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 0.9;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 0.9;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 0.9;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 0.9;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 0.9;
      }
    } else if (
      configuration.vesselType == 'Passenger' &&
      configuration.lengthOverall > 240
    ) {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 0.8;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 0.8;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 0.8;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 0.8;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 0.8;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 0.8;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 0.8;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 0.8;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 0.8;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 0.8;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 0.8;
      }
    } else if (configuration.specialState == 'DG cargo out') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 1.5;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 1.5;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 1.5;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 1.5;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 1.5;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 1.5;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 1.5;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 1.5;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 1.5;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 1.5;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 1.5;
      }
    } else if (configuration.vesselType == 'DG cargo in/out') {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 1.2;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 1.2;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 1.2;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 1.2;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 1.2;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 1.2;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 1.2;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 1.2;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 1.2;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 1.2;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else {
      if (configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190;
      }
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220;
      }
      if (
        configuration.grossTonnage >= 2000 &&
        configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250;
      }
      if (
        configuration.grossTonnage >= 3000 &&
        configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290;
      }
      if (
        configuration.grossTonnage >= 4000 &&
        configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320;
      }
      if (
        configuration.grossTonnage >= 5000 &&
        configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350;
      }
      if (
        configuration.grossTonnage >= 6000 &&
        configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390;
      }
      if (
        configuration.grossTonnage >= 7000 &&
        configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430;
      }
      if (
        configuration.grossTonnage >= 8000 &&
        configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460;
      }
      if (
        configuration.grossTonnage >= 9000 &&
        configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500;
      }
      if (configuration.grossTonnage >= 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = 500 + b * 60;
      }
    }

    // =============== Towage In dues ================= //

    if (configuration.vesselType == 'Passenger') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 420 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 620 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 820 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 1020 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 1220 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 1420 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 1620 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 1820 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 2020 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 2220 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (2200 + d * 55) * 0.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 840 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1240 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 1640 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 2040 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 2440 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 2840 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 3240 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 3640 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 4040 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 4440 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (4440 + d * 110) * 0.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 1260 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1860 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 2460 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 3060 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 3660 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 4260 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 4860 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 5460 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 6060 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 6660 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (6660 + d * 165) * 0.5;
        }
      }
    } else if (configuration.specialState == 'Overtime') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 420 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 620 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 820 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 1020 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 1220 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 1420 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 1620 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 1820 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 2020 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 2220 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (2200 + d * 55) * 1.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 840 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1240 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 1640 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 2040 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 2440 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 2840 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 3240 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 3640 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 4040 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 4440 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (4440 + d * 110) * 1.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 1260 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1860 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 2460 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 3060 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 3660 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 4260 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 4860 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 5460 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 6060 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 6660 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.towageIn = 420;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.towageIn = 620;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.towageIn = 820;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.towageIn = 1020;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.towageIn = 1220;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.towageIn = 1420;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.towageIn = 1620;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.towageIn = 1820;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.towageIn = 2020;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.towageIn = 2220;
      }
      if (configuration.grossTonnage > 10000) {
        const c = configuration.grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        this.computedProforma.varnaWest.towageIn = 2200 + d * 55;
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 840;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1240;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 1640;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 2040;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 2440;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 2840;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 3240;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 3640;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 4040;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 4440;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = 4440 + d * 110;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 1260;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1860;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 2460;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 3060;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 3660;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 4260;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 4860;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 5460;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 6060;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 6660;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = 6660 + d * 165;
        }
      }
    }

    // =============== Towage Out dues ================= //

    if (configuration.vesselType == 'Passenger') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 420 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 620 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 820 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 1020 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 1220 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 1420 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 1620 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 1820 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 2020 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 2220 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (2200 + d * 55) * 0.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 840 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1240 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 1640 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 2040 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 2440 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 2840 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 3240 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 3640 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 4040 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 4440 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (4440 + d * 110) * 0.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 1260 * 0.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1860 * 0.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 2460 * 0.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 3060 * 0.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 3660 * 0.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 4260 * 0.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 4860 * 0.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 5460 * 0.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 6060 * 0.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 6660 * 0.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (6660 + d * 165) * 0.5;
        }
      }
    } else if (configuration.specialState == 'Overtime') {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 420 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 620 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 820 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 1020 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 1220 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 1420 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 1620 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 1820 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 2020 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 2220 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (2200 + d * 55) * 1.5;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 840 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1240 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 1640 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 2040 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 2440 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 2840 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 3240 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 3640 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 4040 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 4440 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (4440 + d * 110) * 1.5;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 1260 * 1.5;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1860 * 1.5;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 2460 * 1.5;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 3060 * 1.5;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 3660 * 1.5;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 4260 * 1.5;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 4860 * 1.5;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 5460 * 1.5;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 6060 * 1.5;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 6660 * 1.5;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (
        configuration.grossTonnage >= 1000 &&
        configuration.grossTonnage <= 4500
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 420;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 620;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 820;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 1020;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 1220;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 1420;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 1620;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 1820;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 2020;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 2220;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = 2200 + d * 55;
        }
      }
      if (
        configuration.grossTonnage > 4500 &&
        configuration.grossTonnage <= 18000
      ) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 840;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1240;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 1640;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 2040;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 2440;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 2840;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 3240;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 3640;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 4040;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 4440;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = 4440 + d * 110;
        }
      }
      if (configuration.grossTonnage > 18000) {
        if (configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 1260;
        }
        if (
          configuration.grossTonnage > 1000 &&
          configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1860;
        }
        if (
          configuration.grossTonnage > 2000 &&
          configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 2460;
        }
        if (
          configuration.grossTonnage > 3000 &&
          configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 3060;
        }
        if (
          configuration.grossTonnage > 4000 &&
          configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 3660;
        }
        if (
          configuration.grossTonnage > 5000 &&
          configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 4260;
        }
        if (
          configuration.grossTonnage > 6000 &&
          configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 4860;
        }
        if (
          configuration.grossTonnage > 7000 &&
          configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 5460;
        }
        if (
          configuration.grossTonnage > 8000 &&
          configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 6060;
        }
        if (
          configuration.grossTonnage > 9000 &&
          configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 6660;
        }
        if (configuration.grossTonnage > 10000) {
          const c = configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = 6660 + d * 165;
        }
      }
    }

    // =============== Mooring dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.mooring = 0;
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.mooring = 60 * 1.5;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.mooring = 90 * 1.5;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.mooring = 120 * 1.5;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.mooring = 140 * 1.5;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.mooring = 160 * 1.5;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.mooring = 180 * 1.5;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.mooring = 200 * 1.5;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.mooring = 220 * 1.5;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.mooring = 230 * 1.5;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.mooring = 240 * 1.5;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.mooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.mooring = 60;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.mooring = 90;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.mooring = 120;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.mooring = 140;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.mooring = 160;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.mooring = 180;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.mooring = 200;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.mooring = 220;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.mooring = 230;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.mooring = 240;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.mooring = 240 + b * 35;
      }
    }

    // =============== Unmooring dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.unmooring = 0;
    } else if (configuration.specialState == 'Overtime') {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.unmooring = 60 * 1.5;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.unmooring = 90 * 1.5;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.unmooring = 120 * 1.5;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.unmooring = 140 * 1.5;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.unmooring = 160 * 1.5;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.unmooring = 180 * 1.5;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.unmooring = 200 * 1.5;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.unmooring = 220 * 1.5;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.unmooring = 230 * 1.5;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.unmooring = 240 * 1.5;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.unmooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.unmooring = 60;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.unmooring = 90;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.unmooring = 120;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.unmooring = 140;
      }
      if (
        configuration.grossTonnage > 4000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.unmooring = 160;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.unmooring = 180;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.unmooring = 200;
      }
      if (
        configuration.grossTonnage > 7000 &&
        configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.unmooring = 220;
      }
      if (
        configuration.grossTonnage > 8000 &&
        configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.unmooring = 230;
      }
      if (
        configuration.grossTonnage > 9000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.unmooring = 240;
      }
      if (configuration.grossTonnage > 10000) {
        const a = configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.unmooring = 240 + b * 35;
      }
    }

    // =============== Channel dues ================= //

    if (configuration.vesselType == 'Container') {
      this.computedProforma.varnaWest.channelDues = Math.round(
        configuration.grossTonnage * 0.04 * 0.25
      );
    } else if (configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaWest.channelDues = Math.round(
        configuration.grossTonnage * 0.04 * 0.5
      );
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.channelDues = Math.round(
        configuration.grossTonnage * 0.04 * 0
      );
    } else {
      this.computedProforma.varnaWest.channelDues = Math.round(
        configuration.grossTonnage * 0.04
      );
    }

    // =============== Light dues ================= //

    if (configuration.vesselType == 'Passenger') {
      if (configuration.grossTonnage <= 10) {
        this.computedProforma.varnaWest.lightDues = 5 * 0.5;
      }
      if (configuration.grossTonnage > 10 && configuration.grossTonnage <= 40) {
        this.computedProforma.varnaWest.lightDues = 10 * 0.5;
      }
      if (
        configuration.grossTonnage > 40 &&
        configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaWest.lightDues = 15 * 0.5;
      }
      if (
        configuration.grossTonnage > 500 &&
        configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaWest.lightDues = 40 * 0.5;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.lightDues = 70 * 0.5;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.lightDues = 110 * 0.5;
      }
      if (configuration.grossTonnage > 10000) {
        this.computedProforma.varnaWest.lightDues = 150 * 0.5;
      }
    } else if (configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.lightDues = 0;
    } else {
      if (configuration.grossTonnage <= 10) {
        this.computedProforma.varnaWest.lightDues = 5;
      }
      if (configuration.grossTonnage > 10 && configuration.grossTonnage <= 40) {
        this.computedProforma.varnaWest.lightDues = 10;
      }
      if (
        configuration.grossTonnage > 40 &&
        configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaWest.lightDues = 15;
      }
      if (
        configuration.grossTonnage > 500 &&
        configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaWest.lightDues = 40;
      }
      if (
        configuration.grossTonnage > 1000 &&
        configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.lightDues = 70;
      }
      if (
        configuration.grossTonnage > 5000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.lightDues = 110;
      }
      if (configuration.grossTonnage > 10000) {
        this.computedProforma.varnaWest.lightDues = 150;
      }
    }

    // =============== Sailing permission dues ================= //

    if (configuration.vesselType == 'navy') {
      this.computedProforma.varnaWest.sailingPermission = 0;
    } else {
      this.computedProforma.varnaWest.sailingPermission = 50;
    }

    // =============== Garbage/Marpol dues ================= //

    if (configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.marpol = 0;
    } else {
      if (configuration.grossTonnage <= 2000) {
        this.computedProforma.varnaWest.marpol = 65;
      }
      if (
        configuration.grossTonnage > 2000 &&
        configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.marpol = 160;
      }
      if (
        configuration.grossTonnage > 3000 &&
        configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.marpol = 210;
      }
      if (
        configuration.grossTonnage > 6000 &&
        configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.marpol = 305;
      }
      if (
        configuration.grossTonnage > 10000 &&
        configuration.grossTonnage <= 20000
      ) {
        this.computedProforma.varnaWest.marpol = 365;
      }
      if (
        configuration.grossTonnage > 20000 &&
        configuration.grossTonnage <= 30000
      ) {
        this.computedProforma.varnaWest.marpol = 460;
      }
      if (
        configuration.grossTonnage > 30000 &&
        configuration.grossTonnage <= 40000
      ) {
        this.computedProforma.varnaWest.marpol = 735;
      }
      if (
        configuration.grossTonnage > 40000 &&
        configuration.grossTonnage <= 50000
      ) {
        this.computedProforma.varnaWest.marpol = 1140;
      }
      if (configuration.grossTonnage > 50000) {
        this.computedProforma.varnaWest.marpol = 1500;
      }
    }

    // =============== Gargo plan dues ================= // For future implementation

    // if (
    //   configuration.operations == 'Loading' &&
    //   configuration.vesselType == 'Container'
    // ) {
    //   this.computedProforma.varnaWest.cargoPlan = 50;
    // } else if (
    //   configuration.operations == 'Loading' &&
    //   configuration.specialState == 'Other'
    // ) {
    //   this.computedProforma.varnaWest.cargoPlan = 500;
    // } else {
    //   this.computedProforma.varnaWest.cargoPlan = 0;
    // }

    // =============== Booming dues ================= // For future implementation

    // this.computedProforma.varnaWest.booming = Math.round(
    //   100 + configuration.lengthOverall * 2.5 * 0.15 * configuration.hoursAtBerth
    // );

    this.computedProforma.varnaWest.total =
      this.computedProforma.varnaWest.tonnageDues +
      this.computedProforma.varnaWest.berthDues +
      this.computedProforma.varnaWest.pilotageIn +
      this.computedProforma.varnaWest.pilotageOut +
      this.computedProforma.varnaWest.towageIn +
      this.computedProforma.varnaWest.towageOut +
      this.computedProforma.varnaWest.mooring +
      this.computedProforma.varnaWest.unmooring +
      this.computedProforma.varnaWest.channelDues +
      this.computedProforma.varnaWest.lightDues +
      this.computedProforma.varnaWest.sailingPermission +
      this.computedProforma.varnaWest.marpol;
  }
}
