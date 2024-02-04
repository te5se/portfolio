import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { CubeComponent } from './cube/cube.component';
import { ExternalLinkComponent } from './external-link/external-link.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { NeonButtonComponent } from './neon-button/neon-button.component';
import { ScheduleCubeItemComponent } from './schedule-cube-item/schedule-cube-item.component';
import { ScheduleImageCarouselComponent } from './schedule-image-carousel/schedule-image-carousel.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ScheduleComponent } from './schedule.component';



@NgModule({
  declarations: [
    ScheduleComponent,
    HomeButtonComponent,
    ScheduleListComponent,
    ExternalLinkComponent,
    ScheduleImageCarouselComponent,
    ScheduleCubeItemComponent,
    CubeComponent,
    NeonButtonComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatTabsModule,
  ]
})
export class ScheduleModule { }
