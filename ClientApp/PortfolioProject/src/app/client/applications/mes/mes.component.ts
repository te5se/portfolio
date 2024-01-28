import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, OnInit, Signal, ViewChild, computed, inject, signal } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
@Component({
    selector: 'app-mes',
    templateUrl: './mes.component.html',
    styleUrls: ['./mes.component.css']
})
export class MESComponent implements OnInit {

    @ViewChild("wrapper") wrapper: ElementRef<HTMLElement> | undefined

    baseHref = inject(APP_BASE_HREF)

    size = signal(2000)
    clientWidth = signal(2000)
    currentProjectImage = signal('')

    gearBottom = computed(() => {
        let value = this.clientWidth() > 600 ? this.size() / 6 - 100 : this.size() / 6 - 150
        return value * -1
    })
    gearRight = computed(() => {
        let value = this.clientWidth() > 600 ? this.size() / 3 - 200 : this.size() / 3 - 100
        return value * -1
    })

    setupedGear = false

    constructor() {
        setInterval(()=>{
            let value = this.gearBottom()
            if (this.wrapper == null) {
                return
            }
            let clientWidth = this.wrapper?.nativeElement.clientWidth
            this.clientWidth.set(clientWidth)
        },100)
    }

    async ngOnInit() {
        setTimeout(() => {
            this.calculateGearTitleSize()
        })
    }

    calculateGearTitleSize() {
        if (this.wrapper == null) {
            return
        }

        let clientWidth = this.wrapper?.nativeElement.clientWidth
        this.clientWidth.set(clientWidth)

        let sizeToSet = clientWidth
        //for some reason doesn't render if default size is < 600
        if (clientWidth < 600 && this.setupedGear == false) {
            this.size.set(700)
            this.setupedGear = true
        }
        if (clientWidth < 600) {
            sizeToSet += 150
        }
        setTimeout(() => {
            this.size.set(sizeToSet)
        })
    }

    onResize(event: any) {
        this.calculateGearTitleSize()
    }
    selectedModuleChanged(moduleName : string){
        if (moduleName == "production route"){
            this.currentProjectImage.set("production-route.PNG")
        } else if (moduleName == "configurator"){
            this.currentProjectImage.set("configurator-roles.PNG")

        } else if (moduleName == "integrator"){
            this.currentProjectImage.set("integrator-links.PNG")
        }
    }
}
