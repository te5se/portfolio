import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSharedModule } from 'projects/client-app/src/app/client-shared-module.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminStartingPageComponent } from './admin/admin-starting-page/admin-starting-page.component';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { RefreshTestComponent } from './components/refresh-test/refresh-test/refresh-test.component';
import { AdminHostComponent } from './admin-host/admin-host.component';
import { ClientHostComponent } from './client-host/client-host.component';

const routes: Routes = [
   
    { path:"refreshTest", component: RefreshTestComponent},
    { path:"test", component: TestComponent},
    {   
        path: 'admin', 
        component: AdminHostComponent,
        children:[
            {
                path: '',
                loadChildren: ()=>import('./admin/admin.module').then(o=>o.AdminModule)
            }
        ]
    },
    {   
        path: 'client', 
        component: ClientHostComponent,
        children:[
            {
                path: '',
                loadChildren: ()=>import('./client/client.module').then(o=>o.ClientModule)
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
