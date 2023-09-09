import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStartingPageComponent } from './admin-starting-page/admin-starting-page.component';

const routes: Routes = [
    { path: '', component: AdminStartingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
