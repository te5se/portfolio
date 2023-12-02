import { Component, Input, OnInit } from '@angular/core';
import { ActiveUser } from '../active-users.component';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {

  @Input() users: ActiveUser[] = []
  @Input() user: ActiveUser = {}

  document : Document = {}
  middleLine : number = 0
  duration : number = 500

  showDocument = false

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.document = {
        x: this.user.x,
        y: this.user.y
      }
    })
    setTimeout(()=>{
      this.checkIfShouldSendDocument()
    },1000)
    setInterval(()=>{
        this.calculateMiddleLine()
    },100)
  }
  calculateMiddleLine(){
    if(this.users.length < 12 || this.users[0].y == null || this.users[6].y == null){
      return
    }
    this.middleLine = (this.users[0].y + this.users[6].y)/2
  }
  checkIfShouldSendDocument() {
    // TODO: DEBUG CODE
    if (this.user.index != 0) {
      return
    }
    let randomIndex = this.getRandomNumber()
    if (randomIndex == this.user.index) {
      return
    }

    this.showDocument = true

    this.document.y = this.middleLine
    setTimeout(()=>{
      this.document.x = this.users[randomIndex].x
    }, this.duration)
    setTimeout(()=>{
      this.document.y = this.users[randomIndex].y
    }, this.duration*2)
    setTimeout(()=>{
      this.showDocument = false
    }, this.duration*3)
  }
  getRandomNumber(): number {
    let value = Math.floor(Math.random() * this.users.length)
    return value
  }
}
export interface Document {
  x? : number
  y? : number
}