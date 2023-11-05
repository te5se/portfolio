import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Pws03UiService } from '../../pws03-ui-service/pws03-ui.service';

@Component({
    selector: 'app-equipment-info-overlay',
    templateUrl: './equipment-info-overlay.component.html',
    styleUrls: ['./equipment-info-overlay.component.css']
})
export class EquipmentInfoOverlayComponent extends BaseComponent {

    @ViewChild("overlayPanel") overlayPanel: OverlayPanel | undefined

    pws03UIService = inject(Pws03UiService)

    isOpen = false
    showAfterHide = false
    override ngOnInit() {
        super.ngOnInit()

        this.createSubscriptions()
    }
    createSubscriptions() {
        setTimeout(() => {
            this.overlayPanel?.onShow.subscribe(() => {
                this.isOpen = true
            })
            this.overlayPanel?.onHide.subscribe(() => {
                this.isOpen = false

                if (this.showAfterHide == false) {
                    return
                }
                setTimeout(() => {
                    this.showAfterHide = false
                    this.overlayPanel?.show(this.pws03UIService.equipmentSelected.value.event)
                })
            })
        })


        this.pws03UIService.equipmentSelected.subscribe((equipmentSelectedDTO) => {
            if (this.isOpen) {
                this.overlayPanel?.hide()
                this.showAfterHide = true
            }
            else {
                this.overlayPanel?.show(equipmentSelectedDTO.event)
            }
        })
    }

}
