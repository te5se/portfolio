import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, OnInit, Output, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeHelper } from 'src/app/helpers/timehelper';

@Component({
  selector: 'app-customizable-routing',
  templateUrl: './customizable-routing.component.html',
  styleUrls: ['./customizable-routing.component.css']
})
export class CustomizableRoutingComponent implements OnInit {

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

  numberOfCoordinators = 3

  passingRate = 0.2

  constructor() { }
  ngOnInit(): void {

    setTimeout(() => {
      this.setupOffsets()
    })
    setInterval(() => {
      this.setupOffsets()
    }, 100)
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
      return
    }

    this.moveDocumentTo("supervisor1")
    this.status.next(`Document vised`)
    await TimeHelper.delay(800)
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
        this.status.next(`Rejected by ${this.getWordForOrder(i + 1)} coordinator`)
        this.movingDocY = lowestItem.top! + 200
        await TimeHelper.delay(500)
        this.movingDocX = firstItem.left!
        await TimeHelper.delay(500)
        this.movingDocY = firstItem.top!
        await TimeHelper.delay(500)
        return false
      } else {
        this.status.next(`Accepted by ${this.getWordForOrder(i + 1)} coordinator`)
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

}
export interface ItemOffset {
  id?: string
  left?: number
  top?: number
}