import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { TimeHelper } from 'src/app/helpers/timehelper';

@Component({
  selector: 'app-customizable-routing',
  templateUrl: './customizable-routing.component.html',
  styleUrls: ['./customizable-routing.component.css']
})
export class CustomizableRoutingComponent implements OnInit {

  baseHref = inject(APP_BASE_HREF)
  personFilled = `url(${this.baseHref}assets/person_fill.png)`

  offsets : ItemOffset[] = []

  movingDocY = 0
  movingDocX = 0
  showDocument = false
  duration = 500
  documentIcon = "contract"

  constructor() { }
  ngOnInit(): void {

    setTimeout(()=>{
      this.setupOffsets()
    })
    setInterval(()=>{
      this.setupOffsets()
    },100)
  }

  async runDocument(){
    this.duration = 0
    this.moveDocumentTo("initiator1")
    await TimeHelper.delay(0)
    this.showDocument = true
    this.duration = 500
    this.moveDocumentTo("coordinator1")
    await TimeHelper.delay(500)
    this.moveDocumentTo("coordinator2")
    await TimeHelper.delay(500)
    this.moveDocumentTo("coordinator3")
    await TimeHelper.delay(500)
    this.moveDocumentTo("supervisor1")
    await TimeHelper.delay(500)
    this.moveDocumentTo("initiator2")
    await TimeHelper.delay(500)
    this.moveDocumentTo("supervisor2")
    await TimeHelper.delay(500)
  }
  changeDocumentIcon(){
    let icons = ["contract","description", "content_paste", "assignment_turned_in", "text_snippet", "note", "news", "two_pager"]
    let randomResult = Math.floor(Math.random()*icons.length)

    this.documentIcon = icons[randomResult]
  }
  setupOffsets(){
    this.offsets = []

    let secondSection = document.getElementById("second-section")
        
    if (secondSection == null){
      return
    }

    this.offsets.push(this.getOffsetItem("initiator1", secondSection))
    this.offsets.push(this.getOffsetItem("coordinator1", secondSection))
    this.offsets.push(this.getOffsetItem("coordinator2", secondSection))
    this.offsets.push(this.getOffsetItem("coordinator3", secondSection))
    this.offsets.push(this.getOffsetItem("supervisor1", secondSection))
    this.offsets.push(this.getOffsetItem("initiator2", secondSection))
    this.offsets.push(this.getOffsetItem("supervisor2", secondSection))
  }
  getOffsetItem(id : string, relativeTo : HTMLElement) : ItemOffset{
    let result = document.getElementById(id)
    if(result == null){
      return {}
    }
    let offset = this.getOffset(result, relativeTo)
    return{
      id : id,
      left : offset.left,
      top : offset.top
    }
  }

  getOffset(el : HTMLElement, relativeTo : HTMLElement) {
    const elRect = el.getBoundingClientRect();
    const relativeToRect = relativeTo.getBoundingClientRect();
    return {
      left: elRect.left - relativeToRect.left,
      top: elRect.top - relativeToRect.top
    };
  }
  moveDocumentTo(id : string){
    let offset = this.offsets.find((offset)=>{
      return offset.id == id
    })

    if(offset?.left == null || offset?.top == null){
      return
    }

    console.debug("id", id, offset)
    console.debug("offsets", this.offsets)

    this.movingDocX = offset.left
    this.movingDocY = offset.top
  }

}
export interface ItemOffset{
  id? : string
  left? : number
  top? : number
}