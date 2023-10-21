import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-feature-selector',
    templateUrl: './feature-selector.component.html',
    styleUrls: ['./feature-selector.component.css']
})
export class FeatureSelectorComponent implements OnInit {

    listItems: string[] = ["Graphic map", "Analytics", "Access control"]
    selectedItem : string = "Analytics"
    selectedItemIndex = 1
    constructor() { }

    ngOnInit(): void {
    }

    selectItem(item : string){
        this.selectedItem = item
        this.selectedItemIndex = this.listItems.indexOf(this.selectedItem)
    }

}
