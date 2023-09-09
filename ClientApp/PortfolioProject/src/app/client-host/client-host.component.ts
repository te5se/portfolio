import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CssVariablesService } from '../services/css-variables.service';
import { ProjectService } from '../services/project.service';
import { Event, Navigation, NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../components/base/base.component';
import { Project } from '../models/project';

@Component({
    selector: 'app-client-host',
    templateUrl: './client-host.component.html',
    styleUrls: ['./client-host.component.css']
})
export class ClientHostComponent extends BaseComponent{

    @ViewChild('routerElement') routerElement : ElementRef<HTMLElement> | undefined

    pointerWidth = 3500
    pointerHeight = 3500
    cssVariableService : CssVariablesService = inject(CssVariablesService)

    projectService = inject(ProjectService)
    router = inject(Router)
    projects : Project[] = []
    
    prevScrollPosition = 0
    shouldHideNavbar = false

    override async ngOnInit() {
        super.ngOnInit()
        this.projects = await this.projectService.getProjects();
        this.refreshSelectedProject(this.router.url)
        this.subscriptions.push(this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd == false){
                return
            }
            this.refreshSelectedProject((event as NavigationEnd).url)
        }))
        this.setNavbarHiding()
    }
    setNavbarHiding(){
        /* document.onscroll = () => {
            console.debug("asdf")
            let currentScrollPosition = window.scrollY;
            if (this.prevScrollPosition > currentScrollPosition) {
                this.shouldHideNavbar = false
            } else {
                this.shouldHideNavbar = true
            }
            this.prevScrollPosition = currentScrollPosition;
        } */
    }
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        this.movePointer(e)
    }
    movePointer(e: MouseEvent) {
        
        var vh = window.innerHeight
        var vw = window.innerWidth

        //96 for navbar margin
        let xPosition = (e.clientX) / vw * 100
        let yPosition = (e.clientY - 96) / vh * 100

        var xOffset = this.pointerWidth / vw / 2 * 100
        var yOffset = this.pointerHeight / vh / 2 * 100

        /* console.debug(xOffset, yOffset) */

        this.cssVariableService.setVariable("--x-position", `${xPosition - xOffset}vw`)
        this.cssVariableService.setVariable("--y-position", `${yPosition - yOffset}vh`)
        this.cssVariableService.setVariable("--pointer-width", `${this.pointerWidth}px`)
        this.cssVariableService.setVariable("--pointer-height", `${this.pointerHeight}px`)
    }
    refreshSelectedProject(url : string) {
        this.projects.forEach(project => {
            if(project.linkLocation == null || url.endsWith(project.linkLocation) == false){
                return
            }
            this.cssVariableService.setupStylesForProject(project);
        });
    }
}


