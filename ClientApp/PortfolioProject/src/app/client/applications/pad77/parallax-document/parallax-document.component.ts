import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parallax-document',
  templateUrl: './parallax-document.component.html',
  styleUrls: ['./parallax-document.component.css']
})
export class ParallaxDocumentComponent implements OnInit {

  @Input() item : PAD77ParallaxItem = {}

  constructor() { }

  ngOnInit(): void {
  }

}

export interface PAD77ParallaxItem{
    tndex? : number
    title? : string
    badge? : number
    isQEC? : boolean // qualified electronic signature
    time? : string
}