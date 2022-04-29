import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.css'],
})
export class FaqItemComponent implements OnInit {
  @Input() title: string;
  showBody: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.showBody = !this.showBody;
  }
}
