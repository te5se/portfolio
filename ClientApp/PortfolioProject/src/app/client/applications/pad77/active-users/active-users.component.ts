import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  users : ActiveUser[] = []

  totalAcceptedCount = 0
  totalRejectedCount = 0

  constructor() { 
    this.setupUsers()
  }

  ngOnInit() {
    setTimeout(()=>{
      this.setupUserCoordinates()

    })
    setInterval(()=>{
      this.setupUserCoordinates()
    },50)
    setInterval(()=>{
      this.refreshGlobalCounts()
    },100)
  }
  refreshGlobalCounts(){
      this.totalAcceptedCount = 0
      this.totalRejectedCount = 0
      this.users.forEach((user)=>{
      if(user.acceptCount != null){
        this.totalAcceptedCount += user.acceptCount
      }
      if(user.rejectCount != null){
        this.totalRejectedCount += user.rejectCount
      }
    })
  }
  setupUserCoordinates(){
    for(let i = 0; i < 12; i++){
      let lastSection = document.getElementById("last-section")
      let result = document.getElementById("user" + i)
      if (lastSection == null || result == null){
        return
      }
      let offset = this.getOffset(result, lastSection)

      this.users[i].x = offset.left
      this.users[i].y = offset.top
    }
  }
  setupUsers(){
    for(let i = 0; i < 12; i++){
      this.users.push({
        index: i, 
      })
    }
  }
  getRow(index : number){
    return Math.floor(index/6) 
  }
  getOffset(el : HTMLElement, relativeTo : HTMLElement) {
    const elRect = el.getBoundingClientRect();
    const relativeToRect = relativeTo.getBoundingClientRect();
    return {
      left: elRect.left - relativeToRect.left,
      top: elRect.top - relativeToRect.top
    };
  }
}
export interface ActiveUser{
  index? : number,
  x? : number, 
  y? : number,
  acceptCount? : number,
  rejectCount? : number
}
