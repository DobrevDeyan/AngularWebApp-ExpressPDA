import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AboutComponent,
    WelcomeComponent,
    FaqComponent,
    ErrorPageComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [],
})
export class PagesModule {}
