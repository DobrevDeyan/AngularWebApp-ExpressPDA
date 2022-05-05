import { Component, Input, OnInit } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = true;
  @Input() slideInterval = 3000;

  selectedIndex = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }
  // sets index of image on dot/indicator click
  selectImage(index: number): void {
    this.selectedIndex = index;
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
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
