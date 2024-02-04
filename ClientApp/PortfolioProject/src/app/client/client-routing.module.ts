import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientStartingPageComponent } from './client-starting-page/client-starting-page.component';

const routes: Routes = [
    { path: 'projects', component: ClientStartingPageComponent},
    {   
      path: 'schedule', 
      loadChildren: ()=>import('./applications/schedule/schedule.module').then(o=>o.ScheduleModule)
    },
    {   
      path: 'pws03', 
      loadChildren: ()=>import('./applications/pws03/pws03.module').then(o=>o.Pws03Module)
    },
    {   
      path: 'mes', 
      loadChildren: ()=>import('./applications/mes/mes.module').then(o=>o.MesModule)
    },
    {   
      path: 'pad77', 
      loadChildren: ()=>import('./applications/pad77/pad77.module').then(o=>o.Pad77Module)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
