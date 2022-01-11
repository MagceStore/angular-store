import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteListComponent } from './components/note/list/list.component';
import { VisualStudioLayoutComponent } from './layouts/visual-studio/visual-studio.component';

const routes: Routes = [
  {
    path: '',
    component: VisualStudioLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'note',
        children: [
          {
            path: 'list',
            component: NoteListComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
