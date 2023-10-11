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

    currentVideoPosition = -90
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


    override ngOnInit(): void {
        super.ngOnInit()
        setTimeout(()=>{
            this.leftWidth = '67%'
            
        },1000)
        setTimeout(()=>{
            this.transitionDuration = '500ms'
            this.updateOnMove = true
        },2000)
        setTimeout(()=>{
            this.videoLineOpacity = 1
            this.videoLineTop = '80vh'
            this.shouldStartVideos.next(true)
            setInterval(()=>{
                this.updateLinePosition()
             },50)
        },3000)
        
        this.setupMouseMoveListener()
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
