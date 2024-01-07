import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() htmlElement : HTMLElement | undefined

  activateRoute = inject(ActivatedRoute)
  isOnProjectsPage = false
  isOnAboutPage = false

  constructor() { }

  ngOnInit(): void {
    this.activateRoute.url.subscribe((url)=>{
      this.isOnProjectsPage = url.length > 0 && url[0].path == "projects"
      this.isOnAboutPage = url.length > 0 && url[0].path == "about"
    })
  }


}
