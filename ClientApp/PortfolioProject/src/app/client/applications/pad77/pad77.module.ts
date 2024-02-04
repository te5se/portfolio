import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveUserComponent } from './active-users/active-user/active-user.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { CustomizableRoutingComponent } from './customizable-routing/customizable-routing.component';
import { Pad77Component } from './pad77.component';
import { ParallaxDocumentComponent } from './parallax-document/parallax-document.component';
import { GraphicalReportComponent } from './reports/graphical-report/graphical-report.component';
import { ReportPieChartComponent } from './reports/graphical-report/report-pie-chart/report-pie-chart.component';
import { ReportTableComponent } from './reports/report-table/report-table.component';
import { ReportsComponent } from './reports/reports.component';
import { TestReportComponent } from './reports/test-report/test-report.component';
import { Pad77RoutingModule } from './pad77-routing.module';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    Pad77Component,
    TestReportComponent,
    ReportTableComponent,
    ReportsComponent,
    GraphicalReportComponent,
    ReportPieChartComponent,
    ParallaxDocumentComponent,
    ActiveUsersComponent,
    ActiveUserComponent,
    CustomizableRoutingComponent
  ],
  imports: [
    CommonModule,
    Pad77RoutingModule,
    TooltipModule
  ]
})
export class Pad77Module { }
