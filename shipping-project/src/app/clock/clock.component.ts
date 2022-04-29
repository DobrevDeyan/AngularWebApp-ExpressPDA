import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  constructor() {}

  private daysArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  private date = new Date();
  public hour: any;
  public minute: string;
  public second: string;
  public ampm: string;
  public day: string;
  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000); // call the update method each second

    this.day = this.daysArray[this.date.getDay()];
  }
  private updateDate(date: Date) {
    const hours = date.getHours();
    this.ampm = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12; // Get hours in 12 hours format
    this.hour = this.hour ? this.hour : 12; // If 0hrs assigns to 12
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour; // adds 0 infront if hrs is above 9

    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }
}