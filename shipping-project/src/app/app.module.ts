import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AsideComponent } from './aside/aside.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { IntroComponent } from './intro/intro.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    AsideComponent,
    LoginFormComponent,
    IntroComponent,
    PricingComponent,
    ContactsComponent,
  ],
  imports: [BrowserModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
