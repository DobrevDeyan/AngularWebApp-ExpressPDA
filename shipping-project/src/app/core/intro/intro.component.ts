import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  myFunction(): void {}

  toggleInfo() {
    const element = document.getElementsByClassName('information')[0];
    setTimeout(() => {
      element.classList.toggle('active');
    }, 500);
  }
}
