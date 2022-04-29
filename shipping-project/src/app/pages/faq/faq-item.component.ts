import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { collapse } from 'src/app/route-animations';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.css'],
  animations: [collapse],
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
