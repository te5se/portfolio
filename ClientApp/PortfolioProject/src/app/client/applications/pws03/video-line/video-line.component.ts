import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-line',
  templateUrl: './video-line.component.html',
  styleUrls: ['./video-line.component.css']
})
export class VideoLineComponent implements OnInit {

    @Input() sources : string[] = [] 

  constructor() { }

  ngOnInit(): void {
  }

}
