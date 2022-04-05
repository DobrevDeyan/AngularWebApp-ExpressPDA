import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';



@NgModule({
  declarations: [
    RegisterFormComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
