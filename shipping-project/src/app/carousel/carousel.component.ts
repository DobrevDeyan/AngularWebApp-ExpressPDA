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
        'https://upload.wikimedia.org/wikipedia/commons/d/db/Port_of_Varna_East.jpg',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc: 'https://www.viaseng.com/files/Пристанище%20снимка%202(6).jpg',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc:
        'https://www.umultirank.org/export/sites/default/.galleries/generic-images/Others/Winter-Calendar/port-4966229_1280.jpg_768826225.jpg',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc:
        'https://transportal.bg/wp-content/uploads/2014/05/images_016-Varna_Eest.jpg',
      imageAlt: 'varnaPort',
    },

    {
      imageSrc: 'http://fs.tu-varna.bg/wp-content/uploads/KMT13.jpg',
      imageAlt: 'varnaPort',
    },
    {
      imageSrc:
        'https://port-varna.bg/assets/images/72570edf7d43574523ff4a885a71545f_019Varna_West.jpg',
      imageAlt: 'varnaPort',
    },
  ];
}
