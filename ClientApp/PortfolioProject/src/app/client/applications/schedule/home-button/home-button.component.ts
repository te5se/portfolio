import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.css']
})
export class HomeButtonComponent implements OnInit {

    router = inject(Router)
  constructor() { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigateByUrl("client/projects")
  }
}
