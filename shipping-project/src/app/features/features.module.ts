import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdaSummaryComponent } from './pda-summary/pda-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PdaSummaryComponent],
  imports: [CommonModule, RouterModule],
})
export class FeaturesModule {}
