import { Component, OnInit, inject } from '@angular/core';
import { random } from 'cypress/types/lodash';
import { timer } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Lesson } from 'src/app/models/lesson';
import { CssVariablesService } from 'src/app/services/css-variables.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends BaseComponent {

    mobileList: string[] = []
    adminList: string[] = []

    beginningText = "The project idea was born under mundane circumstances - it was third year and several competitions behind my back, but none of the projects were truly practical, useful to someone. So the answer to the question \"What could I do with my skills that would actually be worthwhile?\" was electronic schedule. The first reason is practical - my weak eyesight always made it harder to read the paper schedule. The second one was irony of whole situation - I studied as a software engineer, but my university didn't have a simple electronic schedule. Truly ironic. And slightly embarrassing."
    resultsText = `The university agreed to a test run of the system, but ultimately was not interested in supporting the application long term, so the production time was limited to a year in my group and half a year for the whole university`

    cssVariablesService = inject(CssVariablesService)

    x = 0
    y = 0
    changeX = 2
    changeY = 2

    lessons : Lesson[] = []

    override ngOnInit(): void {
        super.ngOnInit()

        this.setupLessons()
        this.setupLists()        

        setInterval(() => {
            this.cssVariablesService.setVariable("--lamp-color", "#00000000")
        }, 100)
        setInterval(() => {
            let cube = document.querySelector('.cube')
            if (cube == null) {
                return
            }
            this.x += this.changeX
            this.y += this.changeY
        }, 200)
        setInterval(() => {
            this.changeX = (Math.random() - 0.5) * 4
            this.changeY = (Math.random() - 0.5) * 4
        }, 5000)
    }
    setupLists(){
        this.mobileList.push("Specialized schedule for teachers and students")
        this.mobileList.push("Works in offline mode")
        this.mobileList.push("Supports even/uneven week differentiation")
        this.mobileList.push("Supports several teachers or groups for a lesson")

        this.adminList.push("Student, lesson, teacher and cabinet dictionaries")
        this.adminList.push("Lesson intersection detection")
        this.adminList.push("Clear visual representation")
        this.adminList.push("Support of irregular lesson times")
    }
    setupLessons(){
        this.lessons.push({
            cabinet: "cab. 401",
            name:"Cybersecurity",
            customTime:"",
            teacher:"Hentry Lawson",
            timeStart:"8:30",
            timeStart2:"8:40"
        })
        this.lessons.push({
            cabinet: "cab. 400",
            name:"Chemistry",
            customTime:"",
            teacher:"Walter White",
            timeStart:"16:10",
            timeStart2:"16:20"
        })
        this.lessons.push({
            cabinet: "cab. 402",
            name:"Economics",
            customTime:"13:00 - 16:20",
            teacher:"Adam Smith",
            timeStart:"13:00",
            timeStart2:"12:50"
        })
        this.lessons.push({
            cabinet: "cab. 418",
            name:"East traditions",
            customTime:"",
            teacher:"Tea Pot",
            timeStart:"13:00",
            timeStart2:"12:50"
        })
        this.lessons.push({
            cabinet: "cab. 404",
            name:"",
            customTime:"",
            teacher:"Jane Doe",
            timeStart:"13:00",
            timeStart2:"12:50"
        })
        this.lessons.push({
            cabinet: "cab. 421",
            name:"The art of misdirection",
            customTime:"",
            teacher:"Apollo Robbins",
            timeStart:"10:25",
            timeStart2:"10:15"
        })
        this.lessons.push({
            cabinet: "cab. 421",
            name:"The art of misdirection",
            customTime:"",
            teacher:"Apollo Robbins",
            timeStart:"10:25",
            timeStart2:"10:15"
        })
        this.lessons.push({
            cabinet: "cab. 409",
            name:"The art of war",
            customTime:"8:30 - 11:50",
            teacher:"Sun Tzu",
            timeStart:"8:30",
            timeStart2:"10:05"
        })
        this.lessons.push({
            cabinet: "cab. 424",
            name:"Psychotherapy",
            customTime:"",
            teacher:"Jordan Peterson",
            timeStart:"8:30",
            timeStart2:"10:05"
        })
        this.lessons.push({
            cabinet: "cab. 410",
            name:"Game development",
            customTime:"",
            teacher:"Deacon St. John",
            timeStart:"18:40",
            timeStart2:"18:30"
        })
    }
    cubeClick(){
        let degrees = Math.floor(Math.random()*16)%4 * 90
        if(Math.random() > 0.5){
            this.x = degrees
            this.y = 0
        }
        else{
            this.y = degrees
            this.x = 0
        }
    }
}
