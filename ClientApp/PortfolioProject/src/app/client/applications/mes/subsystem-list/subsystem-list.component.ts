import { Component, WritableSignal, signal } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'app-subsystem-list',
    templateUrl: './subsystem-list.component.html',
    styleUrl: './subsystem-list.component.css'
})
export class SubsystemListComponent extends BaseComponent {

    items: ListItem[] = []
    selectedItem: WritableSignal<ListItem> = signal({})

    constructor() {
        super()

        this.setupListItems()

        // setInterval(()=>{
        //     this.selectedItem.
        // },1000)
    }

    setupListItems() {
        this.items.push({
            name: "production route",
            description: "View and maintain the routes that your product takes through the subdivisions of your factory"
        })
        this.items.push({
            name: "configurator",
            description: "Tune the application to the needs of your business"
        })
        this.items.push({
            name: "integrator",
            description: "Streamline the integration of our software in your architecture"
        })
    }
}

export interface ListItem {
    name?: string
    description?: string
}
