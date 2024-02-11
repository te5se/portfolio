import { Component, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

    timeouts : NodeJS.Timeout[] = []
    subscriptions: Array<Subscription> = []
    constructor() { }

    ngOnInit(): void {
        setTimeout(()=>{
            this.setupAnimateOnScrollMechanics()
        })
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        })
        this.timeouts.forEach((timeout) => {
            timeout.unref()
        })
    }
    setupAnimateOnScrollMechanics() {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-show")
                } 
                /* else {
                    entry.target.classList.remove("scroll-show")
                } */
            })
        })
        let hiddenElements = document.querySelectorAll(".scroll-hidden")
        hiddenElements.forEach((element) => {
            observer.observe(element)
        })

        let repeatObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-show-repeat")
                } 
                else {
                    entry.target.classList.remove("scroll-show-repeat")
                }
            })
        })
        let hiddenElementsRepeat = document.querySelectorAll(".scroll-hidden-repeat")
        hiddenElementsRepeat.forEach((element) => {
            repeatObserver.observe(element)
        })
    }


}
