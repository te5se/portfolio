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
    @ViewChild('appTemplate', {read: ViewContainerRef}) appHost : ViewContainerRef | undefined;
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
        this.router.events.subscribe(()=>{
            if(this.appHost == null)
            {
                return;
            }
            
            this.loadComponent(this.appHost);  
        })
        
    }
    async loadComponent(vcr: ViewContainerRef) {

        let component : any;

        if(this.router.url.startsWith('/admin'))
        {
            const { AdminHostComponent } = await import('./admin-host/admin-host.component');
            component = AdminHostComponent
        }
        else if(this.router.url.startsWith('/client'))
        {
            const { ClientHostComponent } = await import('./client-host/client-host.component');
            component = ClientHostComponent
        }
        else
        {
            const { SimpleHostComponent } = await import('./simple-host/simple-host.component');
            component = SimpleHostComponent
        }
    
        vcr.clear();
       
        return vcr.createComponent(component)  
    }
}


