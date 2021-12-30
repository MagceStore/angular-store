import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerticalTwoLayoutComponent } from './layouts/vertical-two/vertical-two.component';

const routes: Routes = [
  {
    path: '',
    component: VerticalTwoLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
