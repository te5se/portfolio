import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSharedModule } from 'projects/client-app/src/app/client-shared-module.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminStartingPageComponent } from './admin/admin-starting-page/admin-starting-page.component';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { RefreshTestComponent } from './components/refresh-test/refresh-test/refresh-test.component';

const routes: Routes = [
   
    { path:"refreshTest", component: RefreshTestComponent},
    {   
        path: 'admin', 
        loadChildren: ()=>import('./admin/admin.module').then(o=>o.AdminModule)
    },
    {
        path: 'client', 
        loadChildren: ()=>import('./client/client.module').then(o=>o.ClientModule)
    },
   /*  {
        path: '/', 
        redirectTo: 'client'
    }, */
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
