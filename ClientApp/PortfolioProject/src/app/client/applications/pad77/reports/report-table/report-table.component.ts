import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent extends BaseComponent {

  @Input() rows = 5
  @Input() columns = 3

  @Input() delay = 0
  @Input() delayForEachRow = 25

  @Input() rounded = false

  array = new Array() 


  override ngOnInit(): void {
    super.ngOnInit()
    this.setupArray()
  }

  setupArray(){
    this.array = (new Array(this.rows * this.columns)).fill(1)
  }

}
