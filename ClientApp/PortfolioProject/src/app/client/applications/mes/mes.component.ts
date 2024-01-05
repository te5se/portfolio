import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
@Component({
    selector: 'app-mes',
    templateUrl: './mes.component.html',
    styleUrls: ['./mes.component.css']
})
export class MESComponent implements OnInit {

    @ViewChild("wrapper") wrapper: ElementRef<HTMLElement> | undefined

    size = signal(2000)

    constructor() { 

    }

    async ngOnInit() {
       setTimeout(()=>{
            this.calculateGearTitleSize()

       })
       
    }

    calculateGearTitleSize(){
        if(this.wrapper == null){
            return
        }
        this.size.set(this.wrapper?.nativeElement.clientWidth)
    }
    
    onResize(event : any){
        this.calculateGearTitleSize()
    }
}
