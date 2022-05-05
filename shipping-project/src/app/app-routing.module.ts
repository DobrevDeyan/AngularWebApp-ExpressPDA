import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfilePageComponent } from './authentication/profile-page/profile-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './pages/home/home.component';

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
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'login',
    component: LoginFormComponent,
    data: { animation: 'isRight' },
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
