import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MESComponent } from './mes.component';

const routes: Routes = [
    { path: '', component: MESComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesRoutingModule { }
