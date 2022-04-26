import { Component, OnInit } from '@angular/core';
import { ExportDataService } from 'src/app/shared/export-data.service';
import { PdaCalculationsService } from 'src/app/shared/pda-calculations.service';
import { Proforma } from 'src/app/shared/proforma';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [PdaCalculationsService],
})
export class CalculatorComponent implements OnInit {
  constructor(
    public exportdataService: ExportDataService,
    public pdaService: PdaCalculationsService
  ) {}

  configuration: Proforma = {
    vesselType: 'Other',
    operations: 'Other',
    specialState: 'None',
    grossTonnage: 0,
    lengthOverall: 0,
    hoursAtBerth: 0,
  };

  // Binds to the HTML form
  configurationDefaults: Proforma = {
    vesselType: 'Other',
    operations: 'Other',
    specialState: 'None',
    grossTonnage: 0,
    lengthOverall: 0,
    hoursAtBerth: 0,
  };

  // Computed values
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

  ngOnInit(): void {}

  generateProforma(): void {
    let tonnageInput = (document.querySelector('.input1') as HTMLInputElement)
      .value;
    let lengthInput = (document.querySelector('.input2') as HTMLInputElement)
      .value;
    let hoursInput = (document.querySelector('.input3') as HTMLInputElement)
      .value;

    if (tonnageInput && lengthInput && hoursInput !== '') {
      setTimeout(() => {
        (
          document.querySelector('.table-wrapper') as HTMLElement
        ).style.display = 'flex';
      }, 1000);
      // this.pdaService.calculateProforma();
      this.calculateProforma();

      this.exportdataService.exportProforma(this.configuration);
    } else {
      setTimeout(() => {
        alert('You need to provide the required vessel particulars.');
      }, 300);
    }
  }
  getProforma() {
    this.exportdataService.getProformas();
  }
  resetConfig(): void {
    this.configuration = this.configurationDefaults;
  }
  calculateProforma() {
    // ============================== VARNA EAST FORMULAS ============================== //

    // ===============  Tonnage dues ================= //

    if (this.configuration.vesselType == 'Tanker') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.5
      );
    } else if (this.configuration.vesselType == 'Container') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.55 * 0.6
      );
    } else if (this.configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.55 * 0.4
      );
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0
      );
    } else if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.05
      );
    } else {
      this.computedProforma.varnaEast.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.55
      );
    }

    // =============== Berth dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.berthDues = Math.round(
        this.configuration.lengthOverall *
          this.configuration.hoursAtBerth *
          0.1 *
          0.5 *
          0
      );
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.berthDues = Math.round(
        this.configuration.lengthOverall *
          this.configuration.hoursAtBerth *
          0.1 *
          0
      );
    } else {
      this.computedProforma.varnaEast.berthDues = Math.round(
        this.configuration.lengthOverall * this.configuration.hoursAtBerth * 0.1
      );
    }

    // =============== Pilotage In dues ================= //

    if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall <= 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 0.9;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 0.9;
      }
    } else if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall > 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 0.8;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 0.8;
      }
    } else if (this.configuration.specialState == 'DG cargo in') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 1.5;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 1.5;
      }
    } else if (this.configuration.specialState == 'DG cargo out') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageIn = 190;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 220;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 250;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 290;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 320;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 350;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 390;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 430;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 460;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageIn = 500;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageIn = 500 + b * 60;
      }
    }

    // =============== Pilotage Out dues ================= //

    if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall <= 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 0.9;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 0.9;
      }
    } else if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall > 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 0.8;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 0.8;
      }
    } else if (this.configuration.specialState == 'DG cargo out') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 1.5;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 1.5;
      }
    } else if (this.configuration.vesselType == 'DG cargo in/out') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaEast.pilotageOut = 190;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 220;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 250;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 290;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 320;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 350;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 390;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 430;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 460;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaEast.pilotageOut = 500;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.pilotageOut = 500 + b * 60;
      }
    }

    // =============== Towage In dues ================= //

    if (this.configuration.vesselType == 'Passenger') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 1020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 1220 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 1420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 1620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 1820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 2020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 2220 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (2200 + d * 55) * 0.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 1640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 2040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 2440 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 2840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 3240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 3640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 4040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 4440 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (4440 + d * 110) * 0.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 1260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 2460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 3060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 3660 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 4260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 4860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 5460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 6060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 6660 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (6660 + d * 165) * 0.5;
        }
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 1020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 1220 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 1420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 1620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 1820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 2020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 2220 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (2200 + d * 55) * 1.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 1640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 2040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 2440 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 2840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 3240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 3640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 4040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 4440 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (4440 + d * 110) * 1.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 1260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 2460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 3060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 3660 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 4260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 4860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 5460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 6060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 6660 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.towageIn = 420;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.towageIn = 620;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.towageIn = 820;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.towageIn = 1020;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.towageIn = 1220;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.towageIn = 1420;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.towageIn = 1620;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.towageIn = 1820;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.towageIn = 2020;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.towageIn = 2220;
      }
      if (this.configuration.grossTonnage > 10000) {
        const c = this.configuration.grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        this.computedProforma.varnaEast.towageIn = 2200 + d * 55;
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 840;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1240;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 1640;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 2040;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 2440;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 2840;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 3240;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 3640;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 4040;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 4440;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = 4440 + d * 110;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageIn = 1260;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageIn = 1860;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageIn = 2460;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageIn = 3060;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageIn = 3660;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageIn = 4260;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageIn = 4860;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageIn = 5460;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageIn = 6060;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageIn = 6660;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageIn = 6660 + d * 165;
        }
      }
    }

    // =============== Towage Out dues ================= //

    if (this.configuration.vesselType == 'Passenger') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 1020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 1220 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 1420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 1620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 1820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 2020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 2220 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (2200 + d * 55) * 0.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 1640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 2040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 2440 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 2840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 3240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 3640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 4040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 4440 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (4440 + d * 110) * 0.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 1260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 2460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 3060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 3660 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 4260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 4860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 5460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 6060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 6660 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (6660 + d * 165) * 0.5;
        }
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 1020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 1220 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 1420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 1620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 1820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 2020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 2220 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (2200 + d * 55) * 1.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 1640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 2040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 2440 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 2840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 3240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 3640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 4040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 4440 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (4440 + d * 110) * 1.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 1260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 2460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 3060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 3660 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 4260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 4860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 5460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 6060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 6660 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 420;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 620;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 820;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 1020;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 1220;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 1420;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 1620;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 1820;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 2020;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 2220;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = 2200 + d * 55;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 840;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1240;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 1640;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 2040;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 2440;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 2840;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 3240;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 3640;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 4040;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 4440;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = 4440 + d * 110;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaEast.towageOut = 1260;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaEast.towageOut = 1860;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaEast.towageOut = 2460;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaEast.towageOut = 3060;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaEast.towageOut = 3660;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaEast.towageOut = 4260;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaEast.towageOut = 4860;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaEast.towageOut = 5460;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaEast.towageOut = 6060;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaEast.towageOut = 6660;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaEast.towageOut = 6660 + d * 165;
        }
      }
    }

    // =============== Mooring dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.mooring = 0;
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.mooring = 60 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.mooring = 90 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.mooring = 120 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.mooring = 140 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.mooring = 160 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.mooring = 180 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.mooring = 200 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.mooring = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.mooring = 230 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.mooring = 240 * 1.5;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.mooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.mooring = 60;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.mooring = 90;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.mooring = 120;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.mooring = 140;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.mooring = 160;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.mooring = 180;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.mooring = 200;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.mooring = 220;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.mooring = 230;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.mooring = 240;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.mooring = 240 + b * 35;
      }
    }

    // =============== Unmooring dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.unmooring = 0;
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.unmooring = 60 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.unmooring = 90 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.unmooring = 120 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.unmooring = 140 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.unmooring = 160 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.unmooring = 180 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.unmooring = 200 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.unmooring = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.unmooring = 230 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.unmooring = 240 * 1.5;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.unmooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaEast.unmooring = 60;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaEast.unmooring = 90;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.unmooring = 120;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaEast.unmooring = 140;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.unmooring = 160;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.unmooring = 180;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaEast.unmooring = 200;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaEast.unmooring = 220;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaEast.unmooring = 230;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.unmooring = 240;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaEast.unmooring = 240 + b * 35;
      }
    }

    // =============== Channel dues ================= //

    if (this.configuration.vesselType == 'Container') {
      this.computedProforma.varnaEast.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04 * 0.25
      );
    } else if (this.configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaEast.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04 * 0.5
      );
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04 * 0
      );
    } else {
      this.computedProforma.varnaEast.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04
      );
    }

    // =============== Light dues ================= //

    if (this.configuration.vesselType == 'Passenger') {
      if (this.configuration.grossTonnage <= 10) {
        this.computedProforma.varnaEast.lightDues = 5 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 10 &&
        this.configuration.grossTonnage <= 40
      ) {
        this.computedProforma.varnaEast.lightDues = 10 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 40 &&
        this.configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaEast.lightDues = 15 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 500 &&
        this.configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaEast.lightDues = 40 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.lightDues = 70 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.lightDues = 110 * 0.5;
      }
      if (this.configuration.grossTonnage > 10000) {
        this.computedProforma.varnaEast.lightDues = 150 * 0.5;
      }
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaEast.lightDues = 0;
    } else {
      if (this.configuration.grossTonnage <= 10) {
        this.computedProforma.varnaEast.lightDues = 5;
      }
      if (
        this.configuration.grossTonnage > 10 &&
        this.configuration.grossTonnage <= 40
      ) {
        this.computedProforma.varnaEast.lightDues = 10;
      }
      if (
        this.configuration.grossTonnage > 40 &&
        this.configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaEast.lightDues = 15;
      }
      if (
        this.configuration.grossTonnage > 500 &&
        this.configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaEast.lightDues = 40;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaEast.lightDues = 70;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.lightDues = 110;
      }
      if (this.configuration.grossTonnage > 10000) {
        this.computedProforma.varnaEast.lightDues = 150;
      }
    }

    // =============== Sailing permission dues ================= //

    if (this.configuration.vesselType == 'navy') {
      this.computedProforma.varnaEast.sailingPermission = 0;
    } else {
      this.computedProforma.varnaEast.sailingPermission = 50;
    }

    // =============== Garbage/Marpol dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaEast.marpol = 0;
    } else {
      if (this.configuration.grossTonnage <= 2000) {
        this.computedProforma.varnaEast.marpol = 65;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaEast.marpol = 160;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaEast.marpol = 210;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaEast.marpol = 305;
      }
      if (
        this.configuration.grossTonnage > 10000 &&
        this.configuration.grossTonnage <= 20000
      ) {
        this.computedProforma.varnaEast.marpol = 365;
      }
      if (
        this.configuration.grossTonnage > 20000 &&
        this.configuration.grossTonnage <= 30000
      ) {
        this.computedProforma.varnaEast.marpol = 460;
      }
      if (
        this.configuration.grossTonnage > 30000 &&
        this.configuration.grossTonnage <= 40000
      ) {
        this.computedProforma.varnaEast.marpol = 735;
      }
      if (
        this.configuration.grossTonnage > 40000 &&
        this.configuration.grossTonnage <= 50000
      ) {
        this.computedProforma.varnaEast.marpol = 1140;
      }
      if (this.configuration.grossTonnage > 50000) {
        this.computedProforma.varnaEast.marpol = 1500;
      }
    }

    // =============== Gargo plan dues ================= // For future implementation

    // if (
    //   this.configuration.operations == 'Loading' &&
    //   this.configuration.vesselType == 'Container'
    // ) {
    //   this.computedProforma.varnaEast.cargoPlan = 50;
    // } else if (
    //   this.configuration.operations == 'Loading' &&
    //   this.configuration.specialState == 'Other'
    // ) {
    //   this.computedProforma.varnaEast.cargoPlan = 500;
    // } else {
    //   this.computedProforma.varnaEast.cargoPlan = 0;
    // }

    // =============== Booming dues ================= // For future implementation

    // this.computedProforma.varnaEast.booming = Math.round(
    //   100 + this.configuration.lengthOverall * 2.5 * 0.15 * this.configuration.hoursAtBerth
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

    if (this.configuration.vesselType == 'Tanker') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.5
      );
    } else if (this.configuration.vesselType == 'Container') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.55 * 0.6
      );
    } else if (this.configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.55 * 0.4
      );
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0
      );
    } else if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.05
      );
    } else {
      this.computedProforma.varnaWest.tonnageDues = Math.round(
        Number(this.configuration.grossTonnage) * 0.55
      );
    }

    // =============== Berth dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.berthDues = Math.round(
        this.configuration.lengthOverall *
          this.configuration.hoursAtBerth *
          0.1 *
          0.5 *
          0
      );
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.berthDues = Math.round(
        this.configuration.lengthOverall *
          this.configuration.hoursAtBerth *
          0.1 *
          0
      );
    } else {
      this.computedProforma.varnaWest.berthDues = Math.round(
        this.configuration.lengthOverall * this.configuration.hoursAtBerth * 0.1
      );
    }

    // =============== Pilotage In dues ================= //

    if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall <= 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 0.9;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 0.9;
      }
    } else if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall > 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 0.8;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 0.8;
      }
    } else if (this.configuration.specialState == 'DG cargo in') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 1.5;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 1.5;
      }
    } else if (this.configuration.specialState == 'DG cargo out') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = (500 + b * 60) * 1.2;
      }
    } else {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageIn = 190;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 220;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 250;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 290;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 320;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 350;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 390;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 430;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 460;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageIn = 500;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageIn = 500 + b * 60;
      }
    }

    // =============== Pilotage Out dues ================= //

    if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall <= 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 0.9;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 0.9;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 0.9;
      }
    } else if (
      this.configuration.vesselType == 'Passenger' &&
      this.configuration.lengthOverall > 240
    ) {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 0.8;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 0.8;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 0.8;
      }
    } else if (this.configuration.specialState == 'DG cargo out') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 1.5;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 1.5;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 1.5;
      }
    } else if (this.configuration.vesselType == 'DG cargo in/out') {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460 * 1.2;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500 * 1.2;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = (500 + b * 60) * 1.2;
      }
    } else {
      if (this.configuration.grossTonnage < 1000) {
        this.computedProforma.varnaWest.pilotageOut = 190;
      }
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage < 2000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 220;
      }
      if (
        this.configuration.grossTonnage >= 2000 &&
        this.configuration.grossTonnage < 3000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 250;
      }
      if (
        this.configuration.grossTonnage >= 3000 &&
        this.configuration.grossTonnage < 4000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 290;
      }
      if (
        this.configuration.grossTonnage >= 4000 &&
        this.configuration.grossTonnage < 5000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 320;
      }
      if (
        this.configuration.grossTonnage >= 5000 &&
        this.configuration.grossTonnage < 6000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 350;
      }
      if (
        this.configuration.grossTonnage >= 6000 &&
        this.configuration.grossTonnage < 7000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 390;
      }
      if (
        this.configuration.grossTonnage >= 7000 &&
        this.configuration.grossTonnage < 8000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 430;
      }
      if (
        this.configuration.grossTonnage >= 8000 &&
        this.configuration.grossTonnage < 9000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 460;
      }
      if (
        this.configuration.grossTonnage >= 9000 &&
        this.configuration.grossTonnage < 10000
      ) {
        this.computedProforma.varnaWest.pilotageOut = 500;
      }
      if (this.configuration.grossTonnage >= 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.pilotageOut = 500 + b * 60;
      }
    }

    // =============== Towage In dues ================= //

    if (this.configuration.vesselType == 'Passenger') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 1020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 1220 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 1420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 1620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 1820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 2020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 2220 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (2200 + d * 55) * 0.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 1640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 2040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 2440 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 2840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 3240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 3640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 4040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 4440 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (4440 + d * 110) * 0.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 1260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 2460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 3060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 3660 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 4260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 4860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 5460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 6060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 6660 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (6660 + d * 165) * 0.5;
        }
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 1020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 1220 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 1420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 1620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 1820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 2020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 2220 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (2200 + d * 55) * 1.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 1640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 2040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 2440 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 2840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 3240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 3640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 4040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 4440 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (4440 + d * 110) * 1.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 1260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 2460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 3060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 3660 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 4260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 4860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 5460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 6060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 6660 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.towageIn = 420;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.towageIn = 620;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.towageIn = 820;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.towageIn = 1020;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.towageIn = 1220;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.towageIn = 1420;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.towageIn = 1620;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.towageIn = 1820;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.towageIn = 2020;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.towageIn = 2220;
      }
      if (this.configuration.grossTonnage > 10000) {
        const c = this.configuration.grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        this.computedProforma.varnaWest.towageIn = 2200 + d * 55;
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 840;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1240;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 1640;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 2040;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 2440;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 2840;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 3240;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 3640;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 4040;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 4440;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = 4440 + d * 110;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageIn = 1260;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageIn = 1860;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageIn = 2460;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageIn = 3060;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageIn = 3660;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageIn = 4260;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageIn = 4860;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageIn = 5460;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageIn = 6060;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageIn = 6660;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageIn = 6660 + d * 165;
        }
      }
    }

    // =============== Towage Out dues ================= //

    if (this.configuration.vesselType == 'Passenger') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 1020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 1220 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 1420 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 1620 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 1820 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 2020 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 2220 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (2200 + d * 55) * 0.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 1640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 2040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 2440 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 2840 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 3240 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 3640 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 4040 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 4440 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (4440 + d * 110) * 0.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 1260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 2460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 3060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 3660 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 4260 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 4860 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 5460 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 6060 * 0.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 6660 * 0.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (6660 + d * 165) * 0.5;
        }
      }
    } else if (this.configuration.specialState == 'Overtime') {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 1020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 1220 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 1420 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 1620 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 1820 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 2020 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 2220 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (2200 + d * 55) * 1.5;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 1640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 2040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 2440 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 2840 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 3240 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 3640 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 4040 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 4440 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (4440 + d * 110) * 1.5;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 1260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 2460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 3060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 3660 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 4260 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 4860 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 5460 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 6060 * 1.5;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 6660 * 1.5;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = (6660 + d * 165) * 1.5;
        }
      }
    } else {
      if (
        this.configuration.grossTonnage >= 1000 &&
        this.configuration.grossTonnage <= 4500
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 420;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 620;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 820;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 1020;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 1220;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 1420;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 1620;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 1820;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 2020;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 2220;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = 2200 + d * 55;
        }
      }
      if (
        this.configuration.grossTonnage > 4500 &&
        this.configuration.grossTonnage <= 18000
      ) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 840;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1240;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 1640;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 2040;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 2440;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 2840;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 3240;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 3640;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 4040;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 4440;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = 4440 + d * 110;
        }
      }
      if (this.configuration.grossTonnage > 18000) {
        if (this.configuration.grossTonnage <= 1000) {
          this.computedProforma.varnaWest.towageOut = 1260;
        }
        if (
          this.configuration.grossTonnage > 1000 &&
          this.configuration.grossTonnage <= 2000
        ) {
          this.computedProforma.varnaWest.towageOut = 1860;
        }
        if (
          this.configuration.grossTonnage > 2000 &&
          this.configuration.grossTonnage <= 3000
        ) {
          this.computedProforma.varnaWest.towageOut = 2460;
        }
        if (
          this.configuration.grossTonnage > 3000 &&
          this.configuration.grossTonnage <= 4000
        ) {
          this.computedProforma.varnaWest.towageOut = 3060;
        }
        if (
          this.configuration.grossTonnage > 4000 &&
          this.configuration.grossTonnage <= 5000
        ) {
          this.computedProforma.varnaWest.towageOut = 3660;
        }
        if (
          this.configuration.grossTonnage > 5000 &&
          this.configuration.grossTonnage <= 6000
        ) {
          this.computedProforma.varnaWest.towageOut = 4260;
        }
        if (
          this.configuration.grossTonnage > 6000 &&
          this.configuration.grossTonnage <= 7000
        ) {
          this.computedProforma.varnaWest.towageOut = 4860;
        }
        if (
          this.configuration.grossTonnage > 7000 &&
          this.configuration.grossTonnage <= 8000
        ) {
          this.computedProforma.varnaWest.towageOut = 5460;
        }
        if (
          this.configuration.grossTonnage > 8000 &&
          this.configuration.grossTonnage <= 9000
        ) {
          this.computedProforma.varnaWest.towageOut = 6060;
        }
        if (
          this.configuration.grossTonnage > 9000 &&
          this.configuration.grossTonnage <= 10000
        ) {
          this.computedProforma.varnaWest.towageOut = 6660;
        }
        if (this.configuration.grossTonnage > 10000) {
          const c = this.configuration.grossTonnage - 10000;
          const d = Math.ceil(c / 1000);
          this.computedProforma.varnaWest.towageOut = 6660 + d * 165;
        }
      }
    }

    // =============== Mooring dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.mooring = 0;
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.mooring = 60 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.mooring = 90 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.mooring = 120 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.mooring = 140 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.mooring = 160 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.mooring = 180 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.mooring = 200 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.mooring = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.mooring = 230 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.mooring = 240 * 1.5;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.mooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.mooring = 60;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.mooring = 90;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.mooring = 120;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.mooring = 140;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.mooring = 160;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.mooring = 180;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.mooring = 200;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.mooring = 220;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.mooring = 230;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.mooring = 240;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.mooring = 240 + b * 35;
      }
    }

    // =============== Unmooring dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.unmooring = 0;
    } else if (this.configuration.specialState == 'Overtime') {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.unmooring = 60 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.unmooring = 90 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.unmooring = 120 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.unmooring = 140 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.unmooring = 160 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.unmooring = 180 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.unmooring = 200 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.unmooring = 220 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.unmooring = 230 * 1.5;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.unmooring = 240 * 1.5;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.unmooring = (240 + b * 35) * 1.5;
      }
    } else {
      if (this.configuration.grossTonnage <= 1000) {
        this.computedProforma.varnaWest.unmooring = 60;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 2000
      ) {
        this.computedProforma.varnaWest.unmooring = 90;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.unmooring = 120;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 4000
      ) {
        this.computedProforma.varnaWest.unmooring = 140;
      }
      if (
        this.configuration.grossTonnage > 4000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.unmooring = 160;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.unmooring = 180;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 7000
      ) {
        this.computedProforma.varnaWest.unmooring = 200;
      }
      if (
        this.configuration.grossTonnage > 7000 &&
        this.configuration.grossTonnage <= 8000
      ) {
        this.computedProforma.varnaWest.unmooring = 220;
      }
      if (
        this.configuration.grossTonnage > 8000 &&
        this.configuration.grossTonnage <= 9000
      ) {
        this.computedProforma.varnaWest.unmooring = 230;
      }
      if (
        this.configuration.grossTonnage > 9000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.unmooring = 240;
      }
      if (this.configuration.grossTonnage > 10000) {
        const a = this.configuration.grossTonnage - 10000;
        const b = Math.ceil(a / 1000);
        this.computedProforma.varnaWest.unmooring = 240 + b * 35;
      }
    }

    // =============== Channel dues ================= //

    if (this.configuration.vesselType == 'Container') {
      this.computedProforma.varnaWest.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04 * 0.25
      );
    } else if (this.configuration.vesselType == 'Passenger') {
      this.computedProforma.varnaWest.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04 * 0.5
      );
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04 * 0
      );
    } else {
      this.computedProforma.varnaWest.channelDues = Math.round(
        this.configuration.grossTonnage * 0.04
      );
    }

    // =============== Light dues ================= //

    if (this.configuration.vesselType == 'Passenger') {
      if (this.configuration.grossTonnage <= 10) {
        this.computedProforma.varnaWest.lightDues = 5 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 10 &&
        this.configuration.grossTonnage <= 40
      ) {
        this.computedProforma.varnaWest.lightDues = 10 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 40 &&
        this.configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaWest.lightDues = 15 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 500 &&
        this.configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaWest.lightDues = 40 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.lightDues = 70 * 0.5;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.lightDues = 110 * 0.5;
      }
      if (this.configuration.grossTonnage > 10000) {
        this.computedProforma.varnaWest.lightDues = 150 * 0.5;
      }
    } else if (this.configuration.vesselType == 'Navy') {
      this.computedProforma.varnaWest.lightDues = 0;
    } else {
      if (this.configuration.grossTonnage <= 10) {
        this.computedProforma.varnaWest.lightDues = 5;
      }
      if (
        this.configuration.grossTonnage > 10 &&
        this.configuration.grossTonnage <= 40
      ) {
        this.computedProforma.varnaWest.lightDues = 10;
      }
      if (
        this.configuration.grossTonnage > 40 &&
        this.configuration.grossTonnage <= 500
      ) {
        this.computedProforma.varnaWest.lightDues = 15;
      }
      if (
        this.configuration.grossTonnage > 500 &&
        this.configuration.grossTonnage <= 1000
      ) {
        this.computedProforma.varnaWest.lightDues = 40;
      }
      if (
        this.configuration.grossTonnage > 1000 &&
        this.configuration.grossTonnage <= 5000
      ) {
        this.computedProforma.varnaWest.lightDues = 70;
      }
      if (
        this.configuration.grossTonnage > 5000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.lightDues = 110;
      }
      if (this.configuration.grossTonnage > 10000) {
        this.computedProforma.varnaWest.lightDues = 150;
      }
    }

    // =============== Sailing permission dues ================= //

    if (this.configuration.vesselType == 'navy') {
      this.computedProforma.varnaWest.sailingPermission = 0;
    } else {
      this.computedProforma.varnaWest.sailingPermission = 50;
    }

    // =============== Garbage/Marpol dues ================= //

    if (this.configuration.vesselType == 'Docking') {
      this.computedProforma.varnaWest.marpol = 0;
    } else {
      if (this.configuration.grossTonnage <= 2000) {
        this.computedProforma.varnaWest.marpol = 65;
      }
      if (
        this.configuration.grossTonnage > 2000 &&
        this.configuration.grossTonnage <= 3000
      ) {
        this.computedProforma.varnaWest.marpol = 160;
      }
      if (
        this.configuration.grossTonnage > 3000 &&
        this.configuration.grossTonnage <= 6000
      ) {
        this.computedProforma.varnaWest.marpol = 210;
      }
      if (
        this.configuration.grossTonnage > 6000 &&
        this.configuration.grossTonnage <= 10000
      ) {
        this.computedProforma.varnaWest.marpol = 305;
      }
      if (
        this.configuration.grossTonnage > 10000 &&
        this.configuration.grossTonnage <= 20000
      ) {
        this.computedProforma.varnaWest.marpol = 365;
      }
      if (
        this.configuration.grossTonnage > 20000 &&
        this.configuration.grossTonnage <= 30000
      ) {
        this.computedProforma.varnaWest.marpol = 460;
      }
      if (
        this.configuration.grossTonnage > 30000 &&
        this.configuration.grossTonnage <= 40000
      ) {
        this.computedProforma.varnaWest.marpol = 735;
      }
      if (
        this.configuration.grossTonnage > 40000 &&
        this.configuration.grossTonnage <= 50000
      ) {
        this.computedProforma.varnaWest.marpol = 1140;
      }
      if (this.configuration.grossTonnage > 50000) {
        this.computedProforma.varnaWest.marpol = 1500;
      }
    }

    // =============== Gargo plan dues ================= // For future implementation

    // if (
    //   this.configuration.operations == 'Loading' &&
    //   this.configuration.vesselType == 'Container'
    // ) {
    //   this.computedProforma.varnaWest.cargoPlan = 50;
    // } else if (
    //   this.configuration.operations == 'Loading' &&
    //   this.configuration.specialState == 'Other'
    // ) {
    //   this.computedProforma.varnaWest.cargoPlan = 500;
    // } else {
    //   this.computedProforma.varnaWest.cargoPlan = 0;
    // }

    // =============== Booming dues ================= // For future implementation

    // this.computedProforma.varnaWest.booming = Math.round(
    //   100 + this.configuration.lengthOverall * 2.5 * 0.15 * this.configuration.hoursAtBerth
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
