import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { NgxPopperjsTriggers, NgxPopperjsPlacements, NgxPopperjsContentComponent } from 'ngx-popperjs';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Pws03UiService } from './pws03-ui-service/pws03-ui.service';
import { VirtualElement, createPopper } from '@popperjs/core/lib/popper-lite';
import { EquipmentSelectedDTO } from './work-center/equipment/equipment.component';
import { FeatureSelectorComponent } from './feature-selector/feature-selector.component';
import { APP_BASE_HREF } from '@angular/common';

@Component({
    selector: 'app-pws03',
    templateUrl: './pws03.component.html',
    styleUrls: ['./pws03.component.css'],
})
export class Pws03Component extends BaseComponent {

    @ViewChild('myPopperContent') myPopperContent: NgxPopperjsContentComponent | undefined
    @ViewChild("virtualElement") virtualElement: any
    @ViewChild("secondSection") secondSection: ElementRef<HTMLElement> | undefined
    @ViewChild("featureSelector") featureSelector: FeatureSelectorComponent | undefined
    @ViewChildren('video') videos:QueryList<any> | undefined;
    
    pws03UIService = inject(Pws03UiService)
    baseHref = inject(APP_BASE_HREF)
    changeDetection = inject(ChangeDetectorRef)

    placement: NgxPopperjsPlacements = NgxPopperjsPlacements.TOP

    leftWidth: string = '100%'
    updateOnMove = false
    transitionDuration = '1000ms'
    videoLineTop = '120vh'
    shouldStartVideos = new BehaviorSubject<boolean>(false)
    videoLineOpacity = 0

    videoLineTransform = "translate3d(0px, 0px, 0px)`"
    videoLineTransition = `transform 50ms linear`

    currentVideoPosition = 0
    leftVideoArray: string[] =
        [this.baseHref + "assets/Analytics.mp4",
        this.baseHref + "assets/GraphicRedactor.mp4",
        this.baseHref + "assets/WorkCenterDictionary.mp4",
        this.baseHref + "assets/Users.mp4"]
    rightVideoArray: string[] =
        [this.baseHref + "assets/GraphicRedactor.mp4",
        this.baseHref + "assets/Users.mp4",
        this.baseHref + "assets/WorkCenterDictionary.mp4",
        this.baseHref + "assets/Analytics.mp4"]

    selectedCaption: string = 'Analytics'

    articles: Article[] = []

    popoverTop = ""
    popoverLeft = ""
    popoverSrcElementWidth = ""
    popoverSrcElementHeight = ""

    lastSelectedEquipmentDTO: EquipmentSelectedDTO | undefined


    override ngOnInit(): void {
        super.ngOnInit()
        console.debug("base href", this.baseHref)
        setTimeout(() => {
            this.leftWidth = '67%'
        }, 3000)
        setTimeout(() => {
            this.transitionDuration = '500ms'
            this.updateOnMove = true
        }, 4000)
        setTimeout(() => {
            this.videoLineOpacity = 1
            this.videoLineTop = '80vh'
            this.shouldStartVideos.next(true)
        }, 5000)

        setTimeout(()=>{
            console.debug("videos",this.videos)
            if(this.videos == undefined){
                return
            }
            for(let i = 0; i< this.videos?.length; i++){
                let video = this.videos.get(i)
                console.debug("video", video)
                video.nativeElement.play()
            }
        })

        this.setupArticles()
        this.setupPopover()
    }
    setupPopover() {
        this.pws03UIService.equipmentSelected.subscribe((selectedDTO) => {
            if (selectedDTO.equipment == null) {
                return
            }

            this.lastSelectedEquipmentDTO = selectedDTO

            let rect = selectedDTO.targetElement?.getBoundingClientRect()
            this.popoverLeft = `${rect?.x}px`
            this.popoverTop = `${rect?.y}px`
            this.popoverSrcElementWidth = `${rect?.width}px`
            this.popoverSrcElementHeight = `${rect?.height}px`
            this.myPopperContent?.hide()
            let i = 0
            let interval = setInterval(() => {
                this.myPopperContent?.show()
                i++
                if (i > 10) {
                    clearInterval(interval)
                }
            }, 10)
        })
    }
    setupArticles() {
        this.articles.push({
            Title: 'Graphic map',
            SecondaryTitle: 'features',
            VideoSource: this.baseHref + "assets/GraphicRedactor.mp4",
            Items: ["Quick map editing",
                "Seamless integration with analytics",
                "Real time equipment state updates",
                "Support for irregular work center shapes"]
        })
        this.articles.push({
            Title: 'Analytics',
            SecondaryTitle: 'features',
            VideoSource: this.baseHref + "assets/Analytics.mp4",
            Items: ["Several types of graphics",
                "Custom period and scale settings",
                "PDF export",
                "Data aggregation, side-to-side comparison"]
        })
        this.articles.push({
            Title: 'Customization',
            SecondaryTitle: 'features',
            VideoSource: this.baseHref + "assets/Users.mp4",
            Items: ["Effortless expansion of equipment pool",
                "Limitless equipment types with the help of plugins",
                "Fluid access roles"]
        })
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        if (this.updateOnMove == false) {
            return
        }
        this.leftWidth = `${(e.clientX / window.innerWidth * 100) - 1}%`;
    }

    @HostListener('document:touchmove', ['$event'])
    onTouchMove(e: any) {
        if (this.updateOnMove == false) {
            return
        }
        this.leftWidth = `${(e.touches[0].clientX / window.innerWidth * 100) - 1}%`;
    }

    goToAnalytics() {
        this.myPopperContent?.hide()
        this.secondSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        console.debug("scroll into view",)
        this.featureSelector?.selectItem("Analytics")
    }
    hidePopover() {
        this.myPopperContent?.hide()
        console.debug("hide popover")
        this.pws03UIService.equipmentSelected.next({})
    }
}
export interface Article {
    Title: string
    SecondaryTitle: string
    VideoSource: string
    Items: string[]
}