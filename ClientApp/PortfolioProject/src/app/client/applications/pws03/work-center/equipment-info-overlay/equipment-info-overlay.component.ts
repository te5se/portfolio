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

    override ngOnInit() {
        super.ngOnInit()

        this.createSubscriptions()
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
        //console.debug("caption", equipmentSelectedDTO.state?.caption)
        })
    }

}
