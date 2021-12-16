import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VerticalTwoLayoutComponent } from './layouts/vertical-two/vertical-two.component';
import { SiderBarComponent } from './components/sider-bar/sider-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    VerticalTwoLayoutComponent,
    SiderBarComponent,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    VerticalTwoLayoutComponent,
    LogoComponent,
    NotFoundComponent,
  ]
})
export class SharedModule { }
