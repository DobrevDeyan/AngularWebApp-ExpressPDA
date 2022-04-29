import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';
import { PdaCalculationsService } from './shared/pda-calculations.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/css/reset.css',
    '../assets/css/typography.css',
    '../assets/css/layout.css',
    '../assets/css/responsive.css',
  ],
  animations: [slider],
  providers: [PdaCalculationsService],
})
export class AppComponent {
  constructor(private pdaService: PdaCalculationsService) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  ngOnInit(): void {}
}
