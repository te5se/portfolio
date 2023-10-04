import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';

@Component({
    selector: 'app-cube',
    templateUrl: './cube.component.html',
    styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {

    x = 0
    y = 0
    changeX = 2
    changeY = 2

    lessons : Lesson[] = []

    constructor() { }

    ngOnInit(): void {
        this.setupLessons()
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
    setupLessons() {
        this.lessons.push({
            cabinet: "cab. 401",
            name: "Cybersecurity",
            customTime: "",
            teacher: "Henry Lawson",
            timeStart: "8:30",
            timeStart2: "8:40"
        })
        this.lessons.push({
            cabinet: "cab. 400",
            name: "Chemistry",
            customTime: "",
            teacher: "Walter White",
            timeStart: "16:10",
            timeStart2: "16:20"
        })
        this.lessons.push({
            cabinet: "cab. 402",
            name: "Economics",
            customTime: "13:00 - 16:20",
            teacher: "Adam Smith",
            timeStart: "13:00",
            timeStart2: "12:50"
        })
        this.lessons.push({
            cabinet: "cab. 418",
            name: "East traditions",
            customTime: "",
            teacher: "Tea Pot",
            timeStart: "13:00",
            timeStart2: "12:50"
        })
        this.lessons.push({
            cabinet: "cab. 404",
            name: "",
            customTime: "",
            teacher: "Jane Doe",
            timeStart: "13:00",
            timeStart2: "12:50"
        })
        this.lessons.push({
            cabinet: "cab. 421",
            name: "The art of misdirection",
            customTime: "",
            teacher: "Apollo Robbins",
            timeStart: "10:25",
            timeStart2: "10:15"
        })
        this.lessons.push({
            cabinet: "cab. 421",
            name: "The art of misdirection",
            customTime: "",
            teacher: "Apollo Robbins",
            timeStart: "10:25",
            timeStart2: "10:15"
        })
        this.lessons.push({
            cabinet: "cab. 409",
            name: "The art of war",
            customTime: "8:30 - 11:50",
            teacher: "Sun Tzu",
            timeStart: "8:30",
            timeStart2: "10:05"
        })
        this.lessons.push({
            cabinet: "cab. 424",
            name: "Psychotherapy",
            customTime: "",
            teacher: "Jordan Peterson",
            timeStart: "8:30",
            timeStart2: "10:05"
        })
        this.lessons.push({
            cabinet: "cab. 410",
            name: "Game development",
            customTime: "",
            teacher: "Deacon St. John",
            timeStart: "18:40",
            timeStart2: "18:30"
        })
        
    }
    cubeClick(){
        let degrees = Math.floor(Math.random() * 16) % 4 * 90
        if (Math.random() > 0.5) {
            this.x = degrees
            this.y = 0
        }
        else {
            this.y = degrees
            this.x = 0
        }
    }
}
