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
    beginningText = "The project idea was born under mundane circumstances - it was third year and several competitions behind my back, but none of the projects were truly practical, useful to someone. So the answer to the question \"What could I do with my skills that would actually be worthwhile?\" was electronic schedule. The first reason is practical - my weak eyesight always made it harder to read the paper schedule. The second one was irony of whole situation - I studied as a software engineer, but my university didn't have a simple electronic schedule. Truly ironic. And slightly embarrassing."
    resultsText = `The university agreed to a test run of the system, but ultimately was not interested in supporting the application long term, so the production time was limited to a year in my group and half a year for the whole university`
}
