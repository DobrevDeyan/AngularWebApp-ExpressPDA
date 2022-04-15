import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdaSummaryComponent } from './pda-summary/pda-summary.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [PdaSummaryComponent],
  imports: [CommonModule, RouterModule],
})
export class FeaturesModule {
  constructor() {}
}
