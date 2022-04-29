import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqItemComponent } from './faq/faq-item.component';

@NgModule({
  declarations: [
    AboutComponent,
    WelcomeComponent,
    FaqComponent,
    ErrorPageComponent,
    FaqItemComponent,
  ],
  imports: [CommonModule, RouterModule, BrowserAnimationsModule],
  exports: [BrowserAnimationsModule],
})
export class PagesModule {}
