import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';

@Component({
    selector: 'app-schedule-cube-item',
    templateUrl: './schedule-cube-item.component.html',
    styleUrls: ['./schedule-cube-item.component.css']
})
export class ScheduleCubeItemComponent implements OnInit {

    @Input() lesson: Lesson = {}

    constructor() { }

    ngOnInit(): void {
    }

}
