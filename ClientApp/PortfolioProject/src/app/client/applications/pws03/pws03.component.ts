import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-pws03',
    templateUrl: './pws03.component.html',
    styleUrls: ['./pws03.component.css']
})
export class Pws03Component implements OnInit {

    constructor() { }

    leftWidth : string = '50%'

    ngOnInit(): void {
        this.setupMouseMoveListener()
    }
    setupMouseMoveListener() {
       
        
    }
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e : MouseEvent) {
        this.leftWidth = `${e.clientX / window.innerWidth * 100}%`;
    }

    @HostListener('document:touchmove', ['$event'])
    onTouchMove(e : any) {
        this.leftWidth = `${e.touches[0].clientX / window.innerWidth * 100}%`;
    }

}
