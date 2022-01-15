import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDetailComponent } from './components/note/detail/detail.component';
import { NoteCreateDialog, NoteListComponent } from './components/note/list/list.component';
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
    NoteListComponent,
    NoteDetailComponent,
    NoteCreateDialog,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class StoreModule {}
