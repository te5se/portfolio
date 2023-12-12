import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-customizable-routing',
  templateUrl: './customizable-routing.component.html',
  styleUrls: ['./customizable-routing.component.css']
})
export class CustomizableRoutingComponent implements OnInit {

  baseHref = inject(APP_BASE_HREF)
  personFilled = `url(${this.baseHref}assets/person_fill.png)`
  constructor() { }

  ngOnInit(): void {
  }

}
