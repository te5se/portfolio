import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ItemComponent } from './client-starting-page/item/item.component';
import { ClientStartingPageComponent } from './client-starting-page/client-starting-page.component';
import { ScheduleComponent } from './applications/schedule/schedule.component';
import { AppModule } from '../app.module';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeButtonComponent } from './applications/schedule/home-button/home-button.component';
import { ScheduleListComponent } from './applications/schedule/schedule-list/schedule-list.component';
import { ExternalLinkComponent } from './applications/schedule/external-link/external-link.component';
import { ScheduleImageCarouselComponent } from './applications/schedule/schedule-image-carousel/schedule-image-carousel.component';
import { ScheduleCubeItemComponent } from './applications/schedule/schedule-cube-item/schedule-cube-item.component';
import { Pws03Component } from './applications/pws03/pws03.component';
import { CubeComponent } from './applications/schedule/cube/cube.component';
import { VideoLineComponent } from './applications/pws03/video-line/video-line.component';
import { ShadowsForVideoComponent } from './applications/pws03/shadows-for-video/shadows-for-video.component';
import { FeatureSelectorComponent } from './applications/pws03/feature-selector/feature-selector.component';
import { WorkCenterComponent } from './applications/pws03/work-center/work-center.component';
import { EquipmentComponent } from './applications/pws03/work-center/equipment/equipment.component';
import { EquipmentInfoOverlayComponent } from './applications/pws03/work-center/equipment-info-overlay/equipment-info-overlay.component';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { WcTitleComponent } from './applications/pws03/work-center/wc-title/wc-title.component';
import { BackgroundBallComponent } from './applications/pws03/background-ball/background-ball.component';



@NgModule({
    declarations: [
        ItemComponent,
        ClientStartingPageComponent,
        ScheduleComponent,
        NavbarComponent,
        HomeButtonComponent,
        ScheduleListComponent,
        ExternalLinkComponent,
        ScheduleImageCarouselComponent,
        ScheduleCubeItemComponent,
        Pws03Component,
        CubeComponent,
        VideoLineComponent,
        ShadowsForVideoComponent,
        FeatureSelectorComponent,
        WorkCenterComponent,
        EquipmentComponent,
        EquipmentInfoOverlayComponent,
        WcTitleComponent,
        BackgroundBallComponent
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        CommonModule,
        RouterModule,
        TableModule,
        ButtonModule,
        HttpClientModule,
        InputTextModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        DialogModule,
        InputTextareaModule,
        MatTabsModule,
        OverlayPanelModule,
        NgxPopperjsModule
    ]
})
export class ClientModule { }
