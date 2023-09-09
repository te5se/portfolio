import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

    router = inject(Router)
    @Input() project: Project = {
        cssVariables: []
    };
    @Output() onNavigate: EventEmitter<string> = new EventEmitter();
    constructor() { }

    ngOnInit(): void {
    }
    buttonClick(value: string) {
        this.onNavigate.next(value);
    }
    goToProjectLink() {
        console.debug(this.project.linkLocation)
        if(this.project.linkLocation == null || this.project.linkLocation == ''){
            return
        }
        this.router.navigateByUrl(this.project.linkLocation)
    }
}
