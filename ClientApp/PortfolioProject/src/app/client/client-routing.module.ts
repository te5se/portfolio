import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientStartingPageComponent } from './client-starting-page/client-starting-page.component';
import { ScheduleComponent } from './applications/schedule/schedule.component';
import { Pws03Component } from './applications/pws03/pws03.component';
import { Pad77Component } from './applications/pad77/pad77.component';

const routes: Routes = [
    { path: 'projects', component: ClientStartingPageComponent},
    { path: 'schedule', component: ScheduleComponent},
    { path: 'pws03', component: Pws03Component},
    { path: 'pad77', component: Pad77Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
