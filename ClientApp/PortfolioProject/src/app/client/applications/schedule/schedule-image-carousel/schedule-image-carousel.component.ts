import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-schedule-image-carousel',
    templateUrl: './schedule-image-carousel.component.html',
    styleUrls: ['./schedule-image-carousel.component.css']
})
export class ScheduleImageCarouselComponent implements OnInit {

    selectedIndex = 1
    animationDuration = '150ms'
    constructor() { }

    ngOnInit(): void {
    }
    rightClick() {

        this.animationDuration = '0ms'
        this.selectedIndex = 0
        setTimeout(()=>{
            this.animationDuration = '1050ms'
            this.selectedIndex += 1

        },100)
    }
}
