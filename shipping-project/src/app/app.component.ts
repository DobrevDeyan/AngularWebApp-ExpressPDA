import { Component, HostBinding } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { fader, slider } from './route-animations';
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
  animations: [fader, slider],
})
export class AppComponent {
  title = 'shipping-project';

  // prepareRoute(outlet: RouterOutlet) {
  //   return (
  //     outlet &&
  //     outlet.activatedRouteData &&
  //     outlet.activatedRouteData['animation']
  //   );
  // }
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
