import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent extends BaseComponent {

    states: EquipmentState[] = []
    currentState: EquipmentState = {}

    @Input() equipment: Equipment = {}

    constructor() {
        super()

        this.fillStates()

        this.setRandomState()

        this.setRandomStateWithDelay(5 + Math.random() * 5)
    }

    setRandomStateWithDelay(delay: number) {
        setTimeout(() => {
            this.setRandomState()
            this.setRandomStateWithDelay(5 + Math.random() * 5)
        }, delay * 1000)
    }

    setRandomState() {
        let index = Math.floor(Math.random() * this.states.length)
        this.currentState = this.states[index]
    }
    fillStates() {
        this.states.push({
            backgroundColor: "red",
            caption: "broken",
            color: "white"
        })
        this.states.push({
            backgroundColor: "green",
            caption: "cycle",
            color: "white"
        })
        this.states.push({
            backgroundColor: "orange",
            caption: "idle",
            color: "black"
        })
    }
}
export interface EquipmentState {
    backgroundColor?: string
    color?: string
    caption?: string
}
export interface Equipment {
    inventoryNumber?: string
    model?: string
}