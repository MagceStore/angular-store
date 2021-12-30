import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, LogoComponent],
})
export class SharedModule {}
