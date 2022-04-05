import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { LoginFormComponent } from './features/login-form/login-form.component';
import { IntroComponent } from './core/intro/intro.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { UserService } from './core/user.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    LoginFormComponent,
    IntroComponent,
    PricingComponent,
    ContactsComponent,
  ],
  imports: [BrowserModule, CoreModule.forRoot(), RouterModule],
  providers: [UserService],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
