import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { CssVariable } from 'src/app/models/cssVariable';

@Component({
  selector: 'app-css-variable-list',
  templateUrl: './css-variable-list.component.html',
  styleUrls: ['./css-variable-list.component.css']
})
export class CssVariableListComponent implements OnInit {

  @Input() cssVariables : CssVariable[] = []
  @Output() cssVariablesChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  removeItem(index : number){
    if(this.cssVariables == null){
        return;
    }
    this.cssVariables.splice(index,1);
  }

}
