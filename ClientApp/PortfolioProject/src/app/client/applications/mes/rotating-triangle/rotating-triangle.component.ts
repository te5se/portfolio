import { Component, WritableSignal, signal } from '@angular/core';
import { interval } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'app-rotating-triangle',
    templateUrl: './rotating-triangle.component.html',
    styleUrl: './rotating-triangle.component.css'
})
export class RotatingTriangleComponent extends BaseComponent {

    currentPosition = 1
    items : WritableSignal<MovingItem[]> = signal([])

    constructor(){
        super()

        this.items.update((items)=>{
            items.push({
                caption: "speed",
                currentPosition: 0
            })
            items.push({
                caption: "agility",
                currentPosition: 1
            })
            items.push({
                caption: "reliability",
                currentPosition: 2
            })
            return items
        })

        
    }

    override ngOnInit() {
        super.ngOnInit()

        this.subscriptions.push(interval(5000).subscribe(() => {
            this.updateItem()
        }))
    }
    setActive(item : MovingItem){
        if(item.currentPosition % 3 == 0){
            return
        }
        this.items.update(items =>{
            let newPositionOffset = 3 - item.currentPosition % 3
            
            for(let i = 0; i < items.length; i++){
                items[i].currentPosition += newPositionOffset
            }

            return items
        })
        /* console.debug("timeouts", this.timeouts)
        this.timeouts[0].unref()
        this.timeouts = []
        this.timeouts.push(setInterval(() => {
            this.updateItem()
        }, 5000)) */
    }
    updateItem(){
        this.items.update((items)=>{
            for(let i = 0; i < items.length; i++){
                items[i].currentPosition = (items[i].currentPosition + 1)
            }
            return items
        })
    }


}
export interface MovingItem {
    caption: string
    currentPosition: number
}