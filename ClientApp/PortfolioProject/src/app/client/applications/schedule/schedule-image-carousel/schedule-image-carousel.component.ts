import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-schedule-image-carousel',
    templateUrl: './schedule-image-carousel.component.html',
    styleUrls: ['./schedule-image-carousel.component.css']
})
export class ScheduleImageCarouselComponent implements OnInit {

    selectedPage = 1

    nextImageIndex = 2
    previousImageIndex = 0
    currentImageIndex = 1
    animationDuration = '150ms'

    isMoving = false

    images : string[] = ["admin-1.PNG", "admin-2.PNG", "admin-3.PNG", "admin-4.PNG"]

    constructor() { }

    ngOnInit(): void {
    }
    leftClick() {
        if(this.isMoving){
            return
        }
        this.isMoving = true
        this.animationDuration = '700ms'
        this.selectedPage = 0
        setTimeout(()=>{
            this.animationDuration = '0ms'
            this.currentImageIndex = this.currentImageIndex - 1
            this.previousImageIndex = this.previousImageIndex - 1
            this.nextImageIndex = this.nextImageIndex - 1

            // if went below zero, start from top
            if(this.currentImageIndex < 0){
                this.currentImageIndex = this.images.length - 1
            }
            if(this.previousImageIndex < 0){
                this.previousImageIndex = this.images.length - 1 
            }
            if(this.nextImageIndex < 0){
                this.nextImageIndex = this.images.length - 1
            }

            console.debug(this.previousImageIndex, this.currentImageIndex, this.nextImageIndex)

            this.selectedPage = 1
            this.isMoving = false
        },700)
    }
    rightClick() {
        if(this.isMoving){
            return
        }
        this.isMoving = true
        this.animationDuration = '700ms'
        this.selectedPage = 2
        setTimeout(()=>{
            this.animationDuration = '0ms'
            // if above length, go to zero 
            this.currentImageIndex = (this.currentImageIndex + 1)%this.images.length
            this.previousImageIndex = (this.previousImageIndex + 1)%this.images.length
            this.nextImageIndex = (this.nextImageIndex + 1)%this.images.length

            this.selectedPage = 1
            this.isMoving = false
        },700)
    }
}
