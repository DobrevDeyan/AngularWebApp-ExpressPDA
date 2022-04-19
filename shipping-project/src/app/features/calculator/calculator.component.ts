import { Component, OnInit } from '@angular/core';
import { ExportDataService } from 'src/app/shared/export-data.service';
import { Proforma } from 'src/app/shared/proforma';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor(public eds: ExportDataService) {}

  ngOnInit(): void {}

  generateProforma(): void {}

  resetConfig(): void {
    $('#vesselType').prop('selectedIndex', 0);
    $('#operations').prop('selectedIndex', 0);
    $('#conditions').prop('selectedIndex', 0);
    setTimeout(() => {
      $('table tr').fadeOut(200);
    }, 1000);
    $('#frm').trigger('reset');
  }
}
