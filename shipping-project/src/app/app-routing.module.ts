import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './core/intro/intro.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: IntroComponent,
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
