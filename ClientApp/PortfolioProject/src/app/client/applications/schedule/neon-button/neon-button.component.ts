import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-neon-button',
  templateUrl: './neon-button.component.html',
  styleUrls: ['./neon-button.component.css']
})
export class NeonButtonComponent implements OnInit {
  @Input() href = ''

  constructor() { }

  ngOnInit(): void {
  }

}
