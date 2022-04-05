import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { FeaturesModule } from './features/features.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    LoginFormComponent,
    PricingComponent,
    ContactsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    RouterModule,
    FeaturesModule,
    PagesModule,
    AppRoutingModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
