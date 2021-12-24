import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SiderBarComponent } from './components/sider-bar/sider-bar.component';
import { VerticalTwoLayoutComponent } from './layouts/vertical-two/vertical-two.component';

@NgModule({
  declarations: [
    VerticalTwoLayoutComponent,
    SiderBarComponent,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    VerticalTwoLayoutComponent,
    LogoComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}
