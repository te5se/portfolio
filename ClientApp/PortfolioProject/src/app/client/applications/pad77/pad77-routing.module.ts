import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pad77Component } from './pad77.component';

const routes: Routes = [
    { path: '', component: Pad77Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pad77RoutingModule { }
