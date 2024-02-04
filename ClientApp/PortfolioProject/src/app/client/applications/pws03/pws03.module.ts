import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundBallComponent } from './background-ball/background-ball.component';
import { FeatureSelectorComponent } from './feature-selector/feature-selector.component';
import { Pws03Component } from './pws03.component';
import { ShadowsForVideoComponent } from './shadows-for-video/shadows-for-video.component';
import { VideoLineComponent } from './video-line/video-line.component';
import { EquipmentInfoOverlayComponent } from './work-center/equipment-info-overlay/equipment-info-overlay.component';
import { EquipmentComponent } from './work-center/equipment/equipment.component';
import { WcTitleComponent } from './work-center/wc-title/wc-title.component';
import { WorkCenterComponent } from './work-center/work-center.component';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { Pws03RoutingModule } from './pws03-routing.module';



@NgModule({
  declarations: [
    Pws03Component,
    VideoLineComponent,
    ShadowsForVideoComponent,
    FeatureSelectorComponent,
    WorkCenterComponent,
    EquipmentComponent,
    EquipmentInfoOverlayComponent,
    WcTitleComponent,
    BackgroundBallComponent,
  ],
  imports: [
    CommonModule,
    Pws03RoutingModule,
    NgxPopperjsModule
  ]
})
export class Pws03Module { }
