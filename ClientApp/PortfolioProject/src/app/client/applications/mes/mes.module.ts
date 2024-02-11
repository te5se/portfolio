import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesRoutingModule } from './mes-routing.module';
import { D3ExampleComponent } from './d3-example/d3-example.component';
import { GearsComponent } from './gears/gears.component';
import { MESComponent } from './mes.component';
import { SubsystemListComponent } from './subsystem-list/subsystem-list.component';
import { RotatingTriangleComponent } from './rotating-triangle/rotating-triangle.component';



@NgModule({
  declarations: [
    MESComponent,
    D3ExampleComponent,
    GearsComponent,
    SubsystemListComponent,
    RotatingTriangleComponent
  ],
  imports: [
    CommonModule,
    MesRoutingModule
  ]
})
export class MesModule { }
