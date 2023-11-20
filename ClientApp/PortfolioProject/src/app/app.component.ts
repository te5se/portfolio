import { AfterViewInit, Component, ComponentFactoryResolver, Directive, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { CssVariablesService } from './services/css-variables.service';



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
    constructor(private router:Router, private cssVariablesService : CssVariablesService){
        
    }
    ngAfterViewInit(): void {
        if(this.styleHost == null){
            return;
        }
        this.cssVariablesService.setStyleHost(this.styleHost.nativeElement);
    }
    ngOnInit(){
        
    }
}


