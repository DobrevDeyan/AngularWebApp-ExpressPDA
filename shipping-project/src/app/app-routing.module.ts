import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    data: { animation: 'isLeft' },
    canActivate: [AuthGuard],
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    data: { animation: 'isRight' },
    canActivate: [AuthGuard],
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    data: { animation: 'isRight' },
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { animation: 'isLeft' },
  },

  {
    path: '**',
    component: ErrorPageComponent,
    data: { animation: 'isLeft' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
