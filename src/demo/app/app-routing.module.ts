import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'wizard' },
  {
    path: 'wizard',
    loadChildren: () => import('./demo-wizard/demo-wizard.module').then(m => m.DemoWizardModule) // works with lazy loading
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
