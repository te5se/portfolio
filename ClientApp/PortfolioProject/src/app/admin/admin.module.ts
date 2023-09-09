import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { HttpClientModule } from '@angular/common/http';
import { AdminStartingPageComponent } from './admin-starting-page/admin-starting-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from 'primeng/dialog';
import { AddEditProjectComponent } from './admin-starting-page/add-edit-project/add-edit-project.component';
import { CssVariableListComponent } from './admin-starting-page/add-edit-project/css-variable-list/css-variable-list.component';
@NgModule({
  declarations: [
    AdminStartingPageComponent,
    AddEditProjectComponent,
    CssVariableListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    InputTextModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DialogModule,
    InputTextareaModule,
    FormsModule
  ],
  providers:[
  ]

})
export class AdminModule { }
