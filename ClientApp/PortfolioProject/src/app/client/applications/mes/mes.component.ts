import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
@Component({
    selector: 'app-mes',
    templateUrl: './mes.component.html',
    styleUrls: ['./mes.component.css']
})
export class MESComponent implements OnInit {

    @ViewChild("wrapper") wrapper: ElementRef<HTMLElement> | undefined


    constructor() { }

    async ngOnInit() {
       

        
    }
    

}
