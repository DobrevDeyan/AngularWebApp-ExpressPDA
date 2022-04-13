import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [AboutComponent, WelcomeComponent],
  imports: [CommonModule, RouterModule],
  exports: [],
})
export class PagesModule {}
