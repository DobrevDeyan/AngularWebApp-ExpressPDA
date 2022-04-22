import { Component, OnInit } from '@angular/core';
import { clearScreenDown } from 'readline';
import { ExportDataService } from 'src/app/shared/export-data.service';
import { Proforma } from 'src/app/shared/proforma';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor(public proformaExporter: ExportDataService) {}

  // Default values
  defaultOptions = {
    vesselType: 'Other',
    operations: 'Other',
    specialState: 'None',
    grossTonnage: '10000',
    lengthOverall: '100',
    hoursAtBerth: '10',
  };

  // Binds to the HTML form
  options = {
    vesselType: 'Other',
    operations: 'Other',
    specialState: 'None',
    grossTonnage: '10000',
    lengthOverall: '100',
    hoursAtBerth: '10',
  };

  // Computed values
  computedOptions = {
    varnaEast: {
      tonnageDues: 0,
      berthDues: 0,
    },
    varnaWest: {
      tonnageDues: 0,
      berthDues: 0,
    },
  };

  ngOnInit(): void {}

  generateProforma(): void {
    console.log(this);
    (document.querySelector('.table-wrapper') as HTMLElement).style.display =
      'flex';
    this.calculatePda();
    this.proformaExporter.exportProforma(this.options);
  }

  calculatePda() {
    if (this.options.vesselType == 'Other') {
      this.computedOptions.varnaEast.tonnageDues =
        parseInt(this.options.grossTonnage) * 0.5;
    }
  }

  resetConfig(): void {
    this.options = this.defaultOptions;
  }
}
