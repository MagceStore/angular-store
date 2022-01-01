import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './layouts/contents/footer/footer.component';
import {
    SideAccountMenuComponent
} from './layouts/contents/side-account-menu/side-account-menu.component';
import {
    SideGlobalMenuComponent
} from './layouts/contents/side-global-menu/side-global-menu.component';
import { VisualStudioLayoutComponent } from './layouts/visual-studio/visual-studio.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [
    SideGlobalMenuComponent,
    SideAccountMenuComponent,
    FooterComponent,
    VisualStudioLayoutComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
  ],
})
export class StoreModule {}
