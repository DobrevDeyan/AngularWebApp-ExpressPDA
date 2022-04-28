import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';
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
})
export class AppComponent {
  constructor() {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  images = [
    {
      imageSrc:
        'https://cruisedig.com/sites/default/files/styles/twitter/public/2020-04/Port%20of%20Varna%2C%20Bulgaria.jpg?h=ddc58dd3&itok=BC1gM_s8',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc:
        'https://upload.wikimedia.org/wikipedia/commons/c/c2/Varna_Port.jpg',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc:
        'https://media-cdn.tripadvisor.com/media/photo-s/1a/34/aa/f1/sunset-at-nemo-port-varna.jpg',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc:
        'https://transportal.bg/wp-content/uploads/2014/05/images_016-Varna_Eest.jpg',
      imageAlt: 'varnaPort',
    },

    {
      imageSrc:
        'https://cdn.aiidatapro.net/media/e8/97/1b/t780x490/e8971bf9311f742349b804f91d613f9a.jpg',
      imageAlt: 'varnaPort',
    },
  ];
}
