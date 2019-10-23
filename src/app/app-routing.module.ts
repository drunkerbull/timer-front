import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/guest/guest-routing.module').then(mod => mod.GuestRoutingModule)
  }, {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/user/user-routing.module').then(mod => mod.UserRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
