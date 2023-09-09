import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

    @Input() items: string[] = []
    @Input() isLeft = true
    constructor() { }

    ngOnInit(): void {
    }

}
