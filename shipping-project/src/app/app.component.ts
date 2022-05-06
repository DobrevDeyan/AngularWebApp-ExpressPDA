import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';
import { ProformaCalculatorService } from './services/proforma-calculator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/css/reset.css',
    '../assets/css/responsive.css',
  ],
  animations: [slider],
  providers: [ProformaCalculatorService],
})
export class AppComponent {
  constructor(private calculator: ProformaCalculatorService) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  ngOnInit(): void {}
}
