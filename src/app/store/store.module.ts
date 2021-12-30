import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './layouts/vertical-two/footer/footer.component';
import { HeaderComponent } from './layouts/vertical-two/header/header.component';
import { SiderBarComponent } from './layouts/vertical-two/sider-bar/sider-bar.component';
import { VerticalTwoLayoutComponent } from './layouts/vertical-two/vertical-two.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [
    SiderBarComponent,
    HeaderComponent,
    FooterComponent,
    VerticalTwoLayoutComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, StoreRoutingModule, SharedModule],
})
export class StoreModule {}
