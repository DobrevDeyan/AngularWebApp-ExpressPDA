import { Component, OnInit, Output } from '@angular/core';
import { ExportUserProformasService } from 'src/app/services/export-user-proformas.service';
import { Proforma } from 'src/app/interfaces/proforma';
import { ProformaCalculatorService } from 'src/app/services/proforma-calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  // configuration: Proforma;
  configuration: Proforma = {
    vesselType: 'Other',
    operations: 'Other',
    specialState: 'None',
    grossTonnage: 0,
    lengthOverall: 0,
    hoursAtBerth: 0,
  };

  constructor(
    public exportProforma: ExportUserProformasService,
    public calculator: ProformaCalculatorService
  ) {}

  ngOnInit(): void {}

  resetConfig(): void {
    $('#vesselType').prop('selectedIndex', 0);
    $('#operations').prop('selectedIndex', 0);
    $('#conditions').prop('selectedIndex', 0);
    setTimeout(() => {
      $('table tr').fadeOut(200);
    }, 1000);
    $('#frm').trigger('reset');
  }
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
      }, 500);

      // handle the appearance of both tables with jquery
      $(function () {
        $('table tr').hide();
      });

      $('table tr').each(function (index) {
        $(this)
          .delay(index * 70)
          .show(1000);
      });

      this.calculator.calculateProforma(this.configuration); // Generate PDA
      this.exportProforma.exportProforma(this.configuration); // Export service to handle user proforma details in firestore
    } else {
      setTimeout(() => {
        alert('You need to provide the required vessel particulars.');
      }, 300);
    }
  }
}
