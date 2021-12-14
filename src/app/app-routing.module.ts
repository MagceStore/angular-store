import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerticalTwoLayoutComponent } from './shared/layouts/vertical-two/vertical-two.component';

const routes: Routes = [
  {
    path: '',
    component: VerticalTwoLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
