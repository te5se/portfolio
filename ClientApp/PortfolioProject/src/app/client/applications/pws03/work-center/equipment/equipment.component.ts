import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Pws03UiService } from '../../pws03-ui-service/pws03-ui.service';
import { EquipmentInfoOverlayComponent } from '../equipment-info-overlay/equipment-info-overlay.component';
import { CssVariablesService } from 'src/app/services/css-variables.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent extends BaseComponent {

    @ViewChild("equipmentOverlay") equipmentOverlay: EquipmentInfoOverlayComponent | undefined
    @ViewChild("wrapper") wrapper : ElementRef<HTMLElement> | undefined
    pws03UIService = inject(Pws03UiService)
    cssVariableService = inject(CssVariablesService)

    changeDetector = inject(ChangeDetectorRef)

    states: EquipmentState[] = []
    currentState: EquipmentState = {}

    @Input() equipment: Equipment = {}
    //@Output() onClick = new EventEmitter<MouseEvent>()

    constructor() {
        super()

        this.fillStates()

        setTimeout(()=>{
            this.setRandomState()
        })

        this.setRandomStateWithDelay(5 + Math.random() * 5)

        /* setInterval(()=>{
            if(this.equipment.inventoryNumber != null && this.equipment.inventoryNumber == "2553"){
                console.debug("debug bg color check", this.currentState.backgroundColor)

            }
        },1000) */
    }

    setRandomStateWithDelay(delay: number) {
        setTimeout(() => {
            this.setRandomState()
            this.setRandomStateWithDelay(5 + Math.random() * 5)
        }, delay * 1000)
    }

    async setRandomState() {
        let index = Math.floor(Math.random() * this.states.length)
        this.currentState = this.states[index]
        this.changeDetector.detectChanges()
        //this.wrapper?.nativeElement.setAttribute('style', `background-color: ${this.currentState.backgroundColor}`)

        let selectedEquipmentDTO = this.pws03UIService.equipmentSelected.value 
        if(selectedEquipmentDTO.equipment?.inventoryNumber == this.equipment.inventoryNumber){
            selectedEquipmentDTO.state = this.currentState
            this.pws03UIService.equipmentSelected.next(selectedEquipmentDTO)
        }
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
    onClickMethod(event: MouseEvent) {
        if(this.currentState.backgroundColor == null){
            return
        }
        event.stopImmediatePropagation()
        this.pws03UIService.equipmentSelected.next({
            targetElement: this.wrapper?.nativeElement,
            event: event,
            equipment: this.equipment,
            state: this.currentState
        })
    }
}
export interface EquipmentState {
    backgroundColor?: string
    color?: string
    caption?: string
}
export interface EquipmentSelectedDTO {
    targetElement? : HTMLElement
    equipment?: Equipment
    event?: MouseEvent
    state? : EquipmentState
}
export interface Equipment {
    inventoryNumber?: string
    model?: string
}