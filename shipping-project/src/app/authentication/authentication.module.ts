import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegisterFormComponent, ProfilePageComponent],
  imports: [CommonModule, RouterModule],
})
export class AuthenticationModule {}
