import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { VerticalTwoLayoutComponent } from './shared/layouts/vertical-two/vertical-two.component';

const routes: Routes = [
  {
    path: '',
    component: VerticalTwoLayoutComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
