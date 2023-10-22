import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'app-pws03',
    templateUrl: './pws03.component.html',
    styleUrls: ['./pws03.component.css']
})
export class Pws03Component extends BaseComponent{


    leftWidth : string = '100%'
    updateOnMove = false
    transitionDuration = '1000ms'
    videoLineTop = '120vh'
    shouldStartVideos = new BehaviorSubject<boolean>(false)
    videoLineOpacity = 0

    videoLineTransform = "translate3d(0px, 0px, 0px)`"
    videoLineTransition =`transform 50ms linear`

    currentVideoPosition = 0
    leftVideoArray : string[] = 
                ["../../../../../assets/Analytics.mp4", 
                "../../../../../assets/GraphicRedactor.mp4", 
                "../../../../../assets/WorkCenterDictionary.mp4", 
                "../../../../../assets/Users.mp4"]
    rightVideoArray : string[] = 
                ["../../../../../assets/GraphicRedactor.mp4", 
                "../../../../../assets/Users.mp4", 
                "../../../../../assets/WorkCenterDictionary.mp4", 
                "../../../../../assets/Analytics.mp4"]

    selectedCaption : string = 'Analytics'

    articles : Article[] = []

    override ngOnInit(): void {
        super.ngOnInit()
        setTimeout(()=>{
            this.leftWidth = '67%'
            
        },3000)
        setTimeout(()=>{
            this.transitionDuration = '500ms'
            this.updateOnMove = true
        },4000)
        setTimeout(()=>{
            this.videoLineOpacity = 1
            this.videoLineTop = '80vh'
            this.shouldStartVideos.next(true)
            setInterval(()=>{
                this.updateLinePosition()
             },50)
        },5000)
        
        this.setupMouseMoveListener()
        this.setupArticles()
    }
    setupArticles(){
        /* , 
                , 
                "../../../../../assets/WorkCenterDictionary.mp4", 
                "../../../../../assets/Users.mp4" */
        this.articles.push({
            Title: 'Graphic map',
            SecondaryTitle: 'features',
            VideoSource: "../../../../../assets/GraphicRedactor.mp4",
            Items: ["Quick map editing",
                    "Seamless integration with analytics",
                    "Real time equipment state updates",
                    "Support for irregular work center shapes"]
        })
        this.articles.push({
            Title: 'Analytics',
            SecondaryTitle: 'features',
            VideoSource: "../../../../../assets/Analytics.mp4",
            Items: ["Several types of graphics",
                    "Custom period and scale settings",
                    "PDF export",
                    "Data aggregation, side-to-side comparison"]
        })
        this.articles.push({
            Title: 'Customization',
            SecondaryTitle: 'features',
            VideoSource: "../../../../../assets/Users.mp4",
            Items: ["Effortless expansion of equipment pool",
                    "Limitless equipment types with the help of plugins",
                    "Fluid access roles"]
        })
    }
    updateLinePosition(){
        //refreshing position
        if(this.currentVideoPosition < -100){
            this.videoLineTransition = ``
            this.currentVideoPosition += 102
            setTimeout(()=>{
                this.videoLineTransition =`transform 50ms linear`
            })
        }

        this.videoLineTransform = `translate3d(${this.currentVideoPosition}%, 0px, 0px) `
        this.currentVideoPosition -= 0.2
    }
    setupMouseMoveListener() {
       
        
    }
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e : MouseEvent) {
        if(this.updateOnMove == false){
            return
        }
        this.leftWidth = `${(e.clientX / window.innerWidth * 100) - 1}%`;
    }

    @HostListener('document:touchmove', ['$event'])
    onTouchMove(e : any) {
        if(this.updateOnMove == false){
            return
        }
        this.leftWidth = `${(e.touches[0].clientX / window.innerWidth * 100) - 1}%`;
    }

}
export interface Article{
    Title: string
    SecondaryTitle : string
    VideoSource : string
    Items : string[]
}