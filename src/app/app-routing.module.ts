import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: 'accueil',
    component: AccueilComponent,
    pathMatch: 'full',
  },
  {
    path: 'service',
    component: ServiceComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    component: ServiceComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
