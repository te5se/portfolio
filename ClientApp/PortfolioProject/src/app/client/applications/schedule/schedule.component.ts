import { Component, OnInit, inject } from '@angular/core';
import { timer } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { CssVariablesService } from 'src/app/services/css-variables.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends BaseComponent {

    mobileList: string[] = []
    adminList: string[] = []
    cssVariablesService = inject(CssVariablesService)
    override ngOnInit(): void {
        super.ngOnInit()

        this.mobileList.push("Specialized schedule for teachers and students")
        this.mobileList.push("Works in offline mode")
        this.mobileList.push("Supports even/uneven week differentiation")
        this.mobileList.push("Supports several teachers or groups for a lesson")

        this.adminList.push("Student, lesson, teacher and cabinet dictionaries")
        this.adminList.push("Lesson intersection detection")
        this.adminList.push("Clear visual representation")
        this.adminList.push("Support of irregular lesson times")

        setInterval(() => {
            this.cssVariablesService.setVariable("--lamp-color", "#00000000")
        }, 100)
    }

}
