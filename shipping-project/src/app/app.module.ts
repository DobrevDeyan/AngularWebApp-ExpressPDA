import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { ExportUserProformasService } from './services/export-user-proformas.service';
import { FormsModule } from '@angular/forms';
import { ImportUserProformasService } from './services/import-user-proformas.service';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ContactsComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    RouterModule,
    FeaturesModule,
    PagesModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
  ],
  providers: [
    AuthService,
    ExportUserProformasService,
    ImportUserProformasService,
  ],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
