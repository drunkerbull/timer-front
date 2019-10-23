import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/pages/home/home-routing.module').then(mod => mod.HomeRoutingModule)
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/pages/messages/messages-routing.module').then(mod => mod.MessagesRoutingModule)
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/pages/projects/projects-routing.module').then(mod => mod.ProjectsRoutingModule)
  },
  {
    path: 'statistics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/pages/statistics/statistics-routing.module').then(mod => mod.StatisticsRoutingModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/pages/settings/settings-routing.module').then(mod => mod.SettingsRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
