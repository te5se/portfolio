import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Equipment } from './equipment/equipment.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { NgxPopperjsPlacements, NgxPopperjsTriggers } from 'ngx-popperjs';

@Component({
    selector: 'app-work-center',
    templateUrl: './work-center.component.html',
    styleUrls: ['./work-center.component.css']
})
export class WorkCenterComponent extends BaseComponent {

    numbers = Array(20).fill(19);
    equipments: Equipment[] = []

    override ngOnInit() {
        super.ngOnInit()

        this.setupEquipments()
    }
    setupEquipments() {
        this.equipments.push({
            inventoryNumber: '1171',
            model: "BRDGe 4",
            controller: 'Foreman'
        })
        this.equipments.push({
            inventoryNumber: '2553',
            model: "GalR 25053",
            controller: 'Foreman'
        })
        this.equipments.push({
            inventoryNumber: '341',
            model: "CTC ENDR 1",
            controller: 'Heidenhain'
        })
        this.equipments.push({
            inventoryNumber: '998',
            model: "EoW 998",
            controller: 'Heidenhain'
        })
        this.equipments.push({
            inventoryNumber: '1147',
            model: "MSK 1076",
            controller: 'Heidenhain'
        })
    }
}
