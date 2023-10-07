import { Component, HostListener, OnInit } from '@angular/core';
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
    videoLineBottom = '-50px'

    videoLineOpacity = 0

    videoLineLeftTransform = "translate3d(0px, 0px, 0px)`"
    videoLineRightTransform = "translate3d(100%, 0px, 0px)"
    videoLineTransition =`bottom 500ms,
                            opacity 500ms,
                            transform 100ms linear`

    currentVideoPosition = -90

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
            this.videoLineBottom = '50px'
        },3000)
        setInterval(()=>{
            this.currentVideoPosition -= 0.3

            //refreshing position
            if(this.currentVideoPosition < -100){
                this.videoLineTransition = `bottom 500ms,
                                                opacity 500ms`
                this.currentVideoPosition += 100
                setTimeout(()=>{
                    this.videoLineTransition =`bottom 500ms,
                            opacity 500ms,
                            transform 100ms linear`

                })
            }

            this.videoLineLeftTransform = `translate3d(${this.currentVideoPosition}%, 0px, 0px) `
            this.videoLineRightTransform = `translate3d(${this.currentVideoPosition + 100}%, 0px, 0px) `
        },50)
        this.setupMouseMoveListener()
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
