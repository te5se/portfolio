import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipment, EquipmentSelectedDTO } from '../work-center/equipment/equipment.component';

@Injectable({
    providedIn: 'root'
})
export class Pws03UiService {

    equipmentSelected = new BehaviorSubject<EquipmentSelectedDTO>({})

    constructor() { }
}
