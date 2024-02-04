import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pws03Component } from './pws03.component';

const routes: Routes = [
    { path: '', component: Pws03Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pws03RoutingModule { }
