import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, RouterModule],
})
export class AuthenticationModule {}
