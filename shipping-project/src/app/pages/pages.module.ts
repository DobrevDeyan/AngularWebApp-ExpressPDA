import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [AboutComponent, WelcomeComponent, FaqComponent],
  imports: [CommonModule, RouterModule],
  exports: [],
})
export class PagesModule {}
