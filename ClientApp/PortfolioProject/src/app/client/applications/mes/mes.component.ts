import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
@Component({
  selector: 'app-mes',
  templateUrl: './mes.component.html',
  styleUrls: ['./mes.component.css']
})
export class MESComponent implements OnInit {

  baseHref = inject(APP_BASE_HREF)

  constructor() { }

  async ngOnInit() {
    const loader = new GLTFLoader();

    const loadedData = await loader.loadAsync(this.baseHref + 'assets/gears.glb');
    console.debug("data", loadedData)
  }

}
