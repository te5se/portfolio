import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-shadows-for-video',
    templateUrl: './shadows-for-video.component.html',
    styleUrls: ['./shadows-for-video.component.css']
})
export class ShadowsForVideoComponent implements OnInit {


    @Input() isLight: boolean = true
    constructor() { }

    ngOnInit(): void {
    }

}
