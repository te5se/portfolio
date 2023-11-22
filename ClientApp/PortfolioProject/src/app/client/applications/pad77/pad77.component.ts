import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { PAD77ParallaxItem } from './parallax-document/parallax-document.component';

@Component({
  selector: 'app-pad77',
  templateUrl: './pad77.component.html',
  styleUrls: ['./pad77.component.css']
})
export class Pad77Component extends BaseComponent {

  array30 = (new Array(30)).fill(0)

  parallaxWrappers: ParallaxWrapper[] = []

  constructor() {
    super()

    this.createParallaxWrappers()
  }

  createParallaxWrappers() {
    this.parallaxWrappers.push({
      leftPercent: 60,
      parallaxSpeed: 10,
      opacity: 0.3,
      parallaxItem: {
        badge: 5,
        isQEC: true,
        time: '18:45',
        title: 'Приказ по МТР',
        tndex: 0
      },
      scale: 1,
      topPX: 300
    })
    this.parallaxWrappers.push({
      leftPercent: 0,
      opacity: 1,
      parallaxSpeed: 5,
      parallaxItem: {
        badge: 5,
        isQEC: true,
        time: '18:45',
        title: 'Приказ по МТР',
        tndex: 1
      },
      scale: 1,
      topPX: 0
    })
  }

}
export class ParallaxWrapper {
  parallaxItem: PAD77ParallaxItem = {}
  scale: number = 1
  topPX: number = 0
  leftPercent: number = 0
  parallaxSpeed: number = 0
  opacity: number = 1
}
