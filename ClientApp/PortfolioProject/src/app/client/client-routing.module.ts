import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientStartingPageComponent } from './client-starting-page/client-starting-page.component';
import { ScheduleComponent } from './applications/schedule/schedule.component';
import { Pws03Component } from './applications/pws03/pws03.component';

const routes: Routes = [
    { path: 'projects', component: ClientStartingPageComponent},
    { path: 'schedule', component: ScheduleComponent},
    { path: 'pws03', component: Pws03Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
