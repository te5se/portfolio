import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-host',
  templateUrl: './admin-host.component.html',
  styleUrls: ['./admin-host.component.css']
})
export class AdminHostComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    

  }

}
