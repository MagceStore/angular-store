import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDetailComponent } from './components/note/detail/detail.component';
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
          {
            path: 'detail/:id',
            component: NoteDetailComponent,
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
