import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  generateProforma(): void {}

  resetConfig(): void {
    $('#vesselType').prop('selectedIndex', 0);
    $('#operations').prop('selectedIndex', 0);
    $('#conditions').prop('selectedIndex', 0);
    $('#frm').trigger('reset');
  }
}
