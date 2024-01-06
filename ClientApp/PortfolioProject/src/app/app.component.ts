import { AfterViewInit, Component, ComponentFactoryResolver, Directive, ElementRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { CssVariablesService } from './services/css-variables.service';
import { APP_BASE_HREF } from '@angular/common';



@Directive({ selector: 'appHost' })
export class AppHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
export class AppComponent implements AfterViewInit{
    @ViewChild('styleHost') styleHost:ElementRef<HTMLElement> | undefined;

    title = 'PortfolioProject';
    isAdmin = false;

    baseHref = inject(APP_BASE_HREF)

    constructor(private router:Router, private cssVariablesService : CssVariablesService){
        
    }
    ngAfterViewInit(): void {
        if(this.styleHost == null){
            return;
        }
        this.cssVariablesService.setStyleHost(this.styleHost.nativeElement);
        this.cssVariablesService.setVariable("--base-href", this.baseHref)
        if(window.screen.height != null){
          this.cssVariablesService.setVariable("--screen-height",  (window.screen.height * 0.75).toString() + 'px')
        }
    }
    ngOnInit(){
        
    }
}


