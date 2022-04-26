import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentDate = new Date();
  constructor() {}

  ngOnInit(): void {}

  //   let coll = document.getElementsByClassName("collapsible");
  // let i;

  // for (i = 0; i < coll.length; i++) {
  //   coll[i].addEventListener("click", function () {
  //     this.classList.toggle("active");
  //     let content = this.nextElementSibling;
  //     if (content.style.display === "block") {
  //       content.style.display = "none";
  //     } else {
  //       content.style.display = "block";
  //     }
  //   });
  // }
}
