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

  DURATION = 500

  rateOfSending = 0.3

  document: Document = {}
  middleLine: number = 0
  duration: number = this.DURATION + Math.random() * 100

  animateReject = false
  animateAccept = false
  showDocument = false

  documentIcon = "contract"

  changeDocumentIcon(){
    let icons = ["contract","description", "content_paste", "assignment_turned_in", "text_snippet", "note", "news", "two_pager"]
    let randomResult = Math.floor(Math.random()*icons.length)

    this.documentIcon = icons[randomResult]
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.document = {
        x: this.user.x,
        y: this.user.y
      }
    })
    setTimeout(() => {
      this.trySendDocument()
    }, 1000)
    setInterval(() => {
      this.calculateMiddleLine()
    }, 100)
  }
  calculateMiddleLine() {
    if (this.users.length < 12 || this.users[0].y == null || this.users[6].y == null) {
      return
    }
    this.middleLine = (this.users[0].y + this.users[6].y) / 2
  }
  trySendDocument() {
    this.changeDocumentIcon()
    if (Math.random() > this.rateOfSending) {
      setTimeout(() => {
        this.trySendDocument()
      }, 1000)
      return
    }
    let randomUser = this.getRandomNumber()
    if (randomUser == this.user.index) {
      setTimeout(() => {
        this.trySendDocument()
      }, 1000)
      return
    }

    this.showDocument = true

    this.document.y = this.middleLine
    setTimeout(() => {
      this.document.x = this.users[randomUser].x
    }, this.duration)
    setTimeout(() => {
      this.document.y = this.users[randomUser].y
    }, this.duration * 2)
    setTimeout(() => {
      let isAccept = Math.random() > 0.5

      this.animateReject = isAccept == false
      this.animateAccept = isAccept

      setTimeout(() => {
        this.animateAccept = false
        this.animateReject = false

        let acceptingUser = this.users[randomUser]
        // incoming counts ++ 
        if (isAccept) {
          if (acceptingUser.acceptCount == null) {
            acceptingUser.acceptCount = 1
          } else {
            acceptingUser.acceptCount += 1
          }
        }
        if (isAccept == false) {
          if (acceptingUser.rejectCount == null) {
            acceptingUser.rejectCount = 1
          } else {
            acceptingUser.rejectCount += 1
          }
        }

        setTimeout(() => {
          this.duration = 0
          this.document.x = this.user.x
          this.document.y = this.user.y
        }, 500)
        setTimeout(() => {
          this.duration = this.DURATION + Math.random() * 100
          this.trySendDocument()
        }, 1000)
      }, this.duration)



    }, this.duration * 3)
    setTimeout(() => {
      this.showDocument = false
    }, this.duration * 3)

  }
  getRandomNumber(): number {
    let value = Math.floor(Math.random() * this.users.length)
    return value
  }
}
export interface Document {
  x?: number
  y?: number
}