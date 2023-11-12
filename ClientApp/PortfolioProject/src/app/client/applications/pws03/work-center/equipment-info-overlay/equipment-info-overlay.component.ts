import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Pws03UiService } from '../../pws03-ui-service/pws03-ui.service';
import { NgxPopperjsContentComponent, NgxPopperjsPlacements, NgxPopperjsTriggers } from 'ngx-popperjs';
import { EquipmentSelectedDTO } from '../equipment/equipment.component';
import { CssVariablesService } from 'src/app/services/css-variables.service';

@Component({
    selector: 'app-equipment-info-overlay',
    templateUrl: './equipment-info-overlay.component.html',
    styleUrls: ['./equipment-info-overlay.component.css']
})
export class EquipmentInfoOverlayComponent extends BaseComponent {

    @Output() goToAnalyticsChange = new EventEmitter<boolean>()

    pws03UIService = inject(Pws03UiService)
    cssVariableService = inject(CssVariablesService)

    isOpen = false
    showAfterHide = false

    selectedEquipmentDTO : EquipmentSelectedDTO | undefined
    stateLength : string = ''

    override ngOnInit() {
        super.ngOnInit()

        this.createSubscriptions()
        setInterval(()=>{
            this.calculateStateLength()
        },1000)
    }
    createSubscriptions() {
        this.pws03UIService.equipmentSelected.subscribe((equipmentSelectedDTO) => {
            if(equipmentSelectedDTO == null || equipmentSelectedDTO?.state?.backgroundColor == null || equipmentSelectedDTO.state.color ==
                 null){
                this.selectedEquipmentDTO = undefined
                return
            }
            this.selectedEquipmentDTO = equipmentSelectedDTO
            this.cssVariableService.setVariable("--chosen-equipment-background", equipmentSelectedDTO.state.backgroundColor)
            this.cssVariableService.setVariable("--chosen-equipment-color", equipmentSelectedDTO.state.color)
            this.calculateStateLength()
            
        })
    }
    calculateStateLength(){
        if(this.selectedEquipmentDTO?.lastStateChangeDate == null){
            return
        }
        let msDifference = (new Date()).getTime() - this.selectedEquipmentDTO.lastStateChangeDate.getTime()
        this.stateLength = this.convertMsToTime(msDifference)
    }
    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
    convertMsToTime(milliseconds: number) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
      
        seconds = seconds % 60;
        minutes = minutes % 60;
      
        // 👇️ If you want to roll hours over, e.g. 00 to 24
        // 👇️ uncomment the line below
        // uncommenting next line gets you `00:00:00` instead of `24:00:00`
        // or `12:15:31` instead of `36:15:31`, etc.
        // 👇️ (roll hours over)
        // hours = hours % 24;
      
        return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(
          seconds,
        )}`;
      }

}
