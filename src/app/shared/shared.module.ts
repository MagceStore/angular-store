import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VerticalTwoComponent } from './layouts/vertical-two/vertical-two.component';
import { SiderBarComponent } from './components/sider-bar/sider-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    VerticalTwoComponent,
    SiderBarComponent,
    HeaderComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    VerticalTwoComponent,
    LogoComponent,
  ]
})
export class SharedModule { }
