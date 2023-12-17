import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { PAD77ParallaxItem } from './parallax-document/parallax-document.component';
import { APP_BASE_HREF } from '@angular/common';
import { CustomizableRoutingComponent } from './customizable-routing/customizable-routing.component';
import { TimeHelper } from 'src/app/helpers/timehelper';

@Component({
    selector: 'app-pad77',
    templateUrl: './pad77.component.html',
    styleUrls: ['./pad77.component.css']
})
export class Pad77Component extends BaseComponent {

    @ViewChild("customizableRouting") customizableRouting: CustomizableRoutingComponent | undefined

    baseHref = inject(APP_BASE_HREF)

    array30 = (new Array(30)).fill(0)

    parallaxWrappers: ParallaxWrapper[] = []

    runDocumentCaption = "run the document"
    isRoutingInProgress = false

    constructor() {
        super()

        this.createParallaxWrappers()
    }

    async runDocument() {
        this.customizableRouting?.runDocument()
        this.isRoutingInProgress = true
        let i = 0
        while (this.isRoutingInProgress) {
            await TimeHelper.delay(100)
            i++
            this.runDocumentCaption = "in progress"
            for (let c = 0; c < i % 3; c++) {
                this.runDocumentCaption += '.'
            }
        }
        this.runDocumentCaption = "run another document"
    }


    createParallaxWrappers() {
        this.parallaxWrappers.push({
            leftPercent: 60,
            parallaxSpeed: -0.3,
            parallaxItem: {
                badge: 5,
                isQEC: true,
                time: '18:45',
                title: 'Приказ по МТР',
                opacity: 0.3,
                tndex: 0
            },
            scale: 1.5,
            bottomMarginPX: 1600
        })
        this.parallaxWrappers.push({
            leftPercent: 80,
            parallaxSpeed: 0,
            parallaxItem: {
                badge: 2,
                isQEC: false,
                time: '08:10',
                title: 'Входящий документ',
                opacity: 1,
                tndex: 1
            },
            scale: 1,
            bottomMarginPX: 1000
        })
        this.parallaxWrappers.push({
            leftPercent: 40,
            parallaxSpeed: -0.1,
            parallaxItem: {
                badge: 2,
                isQEC: false,
                time: '16:48',
                title: 'Разрешение на публикацию документа',
                opacity: 1,
                tndex: 2
            },
            scale: 1,
            bottomMarginPX: 1000
        })
        this.parallaxWrappers.push({
            leftPercent: 30,
            parallaxSpeed: 0.5,
            parallaxItem: {
                badge: 2,
                isQEC: true,
                time: '12:12',
                title: 'Приказ о выпуске продукции',
                opacity: 0.7,
                tndex: 3
            },
            scale: 1.2,
            bottomMarginPX: 500
        })
        this.parallaxWrappers.push({
            leftPercent: 10,
            parallaxSpeed: 1,
            parallaxItem: {
                badge: 6,
                isQEC: false,
                time: '20:18',
                title: 'Предложение по улучшению производства',
                opacity: 0.2,
                tndex: 4
            },
            scale: 1.2,
            bottomMarginPX: 0
        })
        this.parallaxWrappers.push({
            leftPercent: 10,
            parallaxSpeed: -0.2,
            parallaxItem: {
                badge: 6,
                isQEC: false,
                time: '20:18',
                title: 'Положение об охране труда',
                opacity: 0.2,
                tndex: 5
            },
            scale: 1.5,
            bottomMarginPX: 1600
        })
        this.parallaxWrappers.push({
            leftPercent: 50,
            parallaxSpeed: 1.5,
            parallaxItem: {
                badge: 1,
                isQEC: false,
                time: '12:20',
                title: 'Разрешение на перенос отпуска',
                opacity: 0.5,
                tndex: 6
            },
            scale: 1.5,
            bottomMarginPX: 0
        })
        this.parallaxWrappers.push({
            leftPercent: 20,
            parallaxSpeed: 0.3,
            parallaxItem: {
                badge: 2,
                isQEC: false,
                time: '15:20',
                title: 'Заявка на списания со склада',
                opacity: 0.8,
                tndex: 7
            },
            scale: 1.5,
            bottomMarginPX: 1000
        })
        this.parallaxWrappers.push({
            leftPercent: 40,
            parallaxSpeed: -0.2,
            parallaxItem: {
                badge: 1,
                isQEC: false,
                time: '11:20',
                title: 'Приказ генерального директора',
                opacity: 0.8,
                tndex: 8
            },
            scale: 1,
            bottomMarginPX: 1700
        })
        this.parallaxWrappers.push({
            leftPercent: 70,
            parallaxSpeed: 0.5,
            parallaxItem: {
                badge: 5,
                isQEC: true,
                time: '11:20',
                title: 'План АСУП',
                opacity: 0.6,
                tndex: 9
            },
            scale: 1,
            bottomMarginPX: 1000
        })
        this.parallaxWrappers.push({
            leftPercent: 90,
            parallaxSpeed: 1,
            parallaxItem: {
                badge: 5,
                isQEC: true,
                time: '11:20',
                title: 'План по дебюрократизации',
                opacity: 1,
                tndex: 10
            },
            scale: 1,
            bottomMarginPX: 0
        })
        this.parallaxWrappers.push({
            leftPercent: 2,
            parallaxSpeed: 1.5,
            parallaxItem: {
                badge: 5,
                isQEC: true,
                time: '11:20',
                title: 'Отчёт по выполнению гос. заказа',
                opacity: 1,
                tndex: 11
            },
            scale: 1,
            bottomMarginPX: 0
        })
    }

}
export class ParallaxWrapper {
    parallaxItem: PAD77ParallaxItem = {}
    scale: number = 1
    bottomMarginPX: number = 0
    leftPercent: number = 0
    parallaxSpeed: number = 0
}
