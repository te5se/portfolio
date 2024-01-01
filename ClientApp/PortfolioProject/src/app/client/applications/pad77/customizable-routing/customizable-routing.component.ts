import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Output, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeHelper } from 'src/app/helpers/timehelper';
import { uniqueNamesGenerator, names, starWars } from 'unique-names-generator'

@Component({
    selector: 'app-customizable-routing',
    templateUrl: './customizable-routing.component.html',
    styleUrls: ['./customizable-routing.component.css']
})
export class CustomizableRoutingComponent implements OnInit {

    @Input() numberOfCoordinators = 3
    @Input() trackTaskProgress = true
    @Output() status = new BehaviorSubject<string>("default status")
    @Output() isInProgress = new BehaviorSubject<boolean>(false)

    baseHref = inject(APP_BASE_HREF)
    personFilled = `url(${this.baseHref}assets/person_fill.png)`

    offsets: ItemOffset[] = []

    movingDocY = 0
    movingDocX = 0
    showDocument = false
    duration = 500
    documentIcon = "contract"
    animateAccept = false
    animateReject = false

    passingRate = 0.2
    coordinatorArray = new Array()

    name : any = {}

    constructor() { }
    ngOnInit(): void {

        setTimeout(() => {
            this.setupOffsets()
        })
        setInterval(() => {
            this.setupOffsets()
        }, 100)
        this.fillArray()
    }
    ngOnChanges() {
        this.fillArray()
    }
    fillArray() {
        this.coordinatorArray = (new Array(this.numberOfCoordinators)).fill(0)
    }

    async runDocument() {
        this.isInProgress.next(true)

        this.duration = 0
        this.moveDocumentTo("initiator1")
        this.status.next(`Create document`)
        await TimeHelper.delay(0)
        this.showDocument = true
        this.duration = 500

        let result = await this.runCoordinatorStage()
        if (result == false) {
            this.showDocument = false
            this.isInProgress.next(false)
            return
        }

        this.moveDocumentTo("supervisor1")
        this.status.next(`Document vised`)
        await TimeHelper.delay(800)
        if(this.trackTaskProgress == false){
            this.animateAccept = true
            await TimeHelper.delay(500)
            this.animateAccept = false
            this.showDocument = false
            this.isInProgress.next(false)
            return
        }
        this.moveDocumentTo("initiator2")
        this.status.next(`Created task by the document`)
        await TimeHelper.delay(800)
        this.moveDocumentTo("supervisor2")
        this.status.next(`Report sent to the supervisor`)
        await TimeHelper.delay(800)
        this.animateAccept = true
        await TimeHelper.delay(500)
        this.animateAccept = false
        this.status.next(`Report accepted`)

        this.showDocument = false
        this.isInProgress.next(false)
    }
    // return value means SHOULD_CONTINUE
    async runCoordinatorStage(): Promise<boolean> {
        let currentStage = 0
        for (let i = 0; i < this.numberOfCoordinators; i++) {
            let shouldAccept = Math.random() - this.passingRate > 0
            let id = "coordinator" + i
            this.moveDocumentTo(id)
            await TimeHelper.delay(500)
            this.animateAccept = shouldAccept
            this.animateReject = !shouldAccept
            await TimeHelper.delay(500)
            this.animateAccept = false
            this.animateReject = false

            // move to start
            if (shouldAccept == false) {
                let firstItem = this.offsets.find((offset) => {
                    return offset.id = "initiator1"
                })
                let lowestItem = this.offsets.find((offset) => {
                    return offset.id = "coordinator" + this.numberOfCoordinators
                })
                if (firstItem?.id == null || lowestItem?.id == null) {
                    return false
                }
                this.status.next(`Rejected by ${this.getWordForOrder(i + 1)} coordinator <b>(${this.getNameForIndex(i)})</b>`)
                this.movingDocY = lowestItem.top! + 200
                await TimeHelper.delay(500)
                this.movingDocX = firstItem.left!
                await TimeHelper.delay(500)
                this.movingDocY = firstItem.top!
                await TimeHelper.delay(500)
                return false
            } else {
                this.status.next(`Accepted by ${this.getWordForOrder(i + 1)} coordinator <b>(${this.getNameForIndex(i)})</b>`)
            }
        }
        return true
    }
    getWordForOrder(order: number) {
        if (order == 1) {
            return "first"
        }
        if (order == 2) {
            return "second"
        }
        if (order == 3) {
            return "third"
        }
        if (order == 4) {
            return "fourth"
        }
        if (order == 5) {
            return "fifth"
        }
        return ""
    }
    changeDocumentIcon() {
        let icons = ["contract", "description", "content_paste", "assignment_turned_in", "text_snippet", "note", "news", "two_pager"]
        let randomResult = Math.floor(Math.random() * icons.length)

        this.documentIcon = icons[randomResult]
    }
    setupOffsets() {
        this.offsets = []

        let secondSection = document.getElementById("second-section")

        if (secondSection == null) {
            return
        }

        this.offsets.push(this.getOffsetItem("initiator1", secondSection))
        for (let i = 0; i < this.numberOfCoordinators; i++) {
            this.offsets.push(this.getOffsetItem("coordinator" + i.toString(), secondSection))
        }
        this.offsets.push(this.getOffsetItem("supervisor1", secondSection))
        this.offsets.push(this.getOffsetItem("initiator2", secondSection))
        this.offsets.push(this.getOffsetItem("supervisor2", secondSection))
    }
    getOffsetItem(id: string, relativeTo: HTMLElement): ItemOffset {
        let result = document.getElementById(id)
        if (result == null) {
            return {}
        }
        let offset = this.getOffset(result, relativeTo)
        return {
            id: id,
            left: offset.left,
            top: offset.top
        }
    }

    getOffset(el: HTMLElement, relativeTo: HTMLElement) {
        const elRect = el.getBoundingClientRect();
        const relativeToRect = relativeTo.getBoundingClientRect();
        return {
            left: elRect.left - relativeToRect.left,
            top: elRect.top - relativeToRect.top
        };
    }
    moveDocumentTo(id: string) {
        let offset = this.offsets.find((offset) => {
            return offset.id == id
        })

        if (offset?.left == null || offset?.top == null) {
            return
        }

        console.debug("id", id, offset)
        console.debug("offsets", this.offsets)

        this.movingDocX = offset.left
        this.movingDocY = offset.top
    }
    getColumn(defaultColumn : number){
        if(this.numberOfCoordinators == 5){
            switch (defaultColumn){
                case 2: return 3
                case 3: return 2
                case 4: return 1
                case 5: return 3
            }
        }
        return defaultColumn
    }
    getRow(defaultRow : number){
        if(this.numberOfCoordinators == 5){
            switch (defaultRow){
                case 2: return 1
                case 3: return 2
                case 4: return 3
                case 5: return 3
            }
        }
        return defaultRow
    }
    getNameForIndex(index : number){

        if(this.name[index] != null){
            return this.name[index]
        }

        let shortName = uniqueNamesGenerator({
            dictionaries: [starWars], // colors can be omitted here as not used
            length: 1
        });
        this.name[index] = shortName
        return shortName
        
    }
}
export interface ItemOffset {
    id?: string
    left?: number
    top?: number
}