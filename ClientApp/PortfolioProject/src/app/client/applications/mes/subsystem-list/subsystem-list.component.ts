import { Component, Output, WritableSignal, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { toObservable } from '@angular/core/rxjs-interop';
@Component({
    selector: 'app-subsystem-list',
    templateUrl: './subsystem-list.component.html',
    styleUrl: './subsystem-list.component.css'
})
export class SubsystemListComponent extends BaseComponent {

    items: ListItem[] = []
    selectedItem: WritableSignal<ListItem> = signal({})
    @Output() selectionChanged = new BehaviorSubject<string>('')

    selectedItemObservable = toObservable(this.selectedItem)

    constructor() {
        super()

        this.setupListItems()

        this.selectedItemObservable.subscribe((selectedItem)=>{
            if(selectedItem.name == null){
                return
            }
            this.selectionChanged.next(selectedItem.name)
        })
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

        this.selectedItem.set(this.items[0])
    }
    selectItem(item : ListItem){
        this.selectedItem.set(item)
    }
}

export interface ListItem {
    name?: string
    description?: string
}
