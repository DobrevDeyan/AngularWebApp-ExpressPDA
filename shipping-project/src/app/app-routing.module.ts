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
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthGuard } from './services/auth.guard';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'home',

    component: HomeComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'pricing',
    component: PricingComponent,
    // data: { animation: 'isRight' },
    data: { animation: 'fader' },
  },
  {
    path: 'profile',
    // canActivate: [AuthGuard],
    component: ProfilePageComponent,
    data: { animation: 'isLeft' },
    // data: { animation: 'fader' },
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    data: { animation: 'fader' },

    // canActivate: [AuthGuard],
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'login',
    component: LoginFormComponent,
    data: { animation: 'fader' },
  },
  {
    path: 'logout',
    component: WelcomeComponent,
    data: { animation: 'fader' },
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: { animation: 'fader' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
