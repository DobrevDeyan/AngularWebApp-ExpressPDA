import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProfilePageComponent } from './authentication/profile-page/profile-page.component';
import { RegisterFormComponent } from './authentication/register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'logout',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// export const AppRoutingModule = RouterModule.forRoot(routes);
