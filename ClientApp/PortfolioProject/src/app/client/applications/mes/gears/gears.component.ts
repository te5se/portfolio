import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-gears',
  templateUrl: './gears.component.html',
  styleUrl: './gears.component.css'
})
export class GearsComponent {
  @ViewChild("wrapper") wrapper: ElementRef<HTMLElement> | undefined
  @Input() size = 500
  
  baseHref = inject(APP_BASE_HREF)

  x = 2
  y = 0 
  z = 4


  defaultSpeed = 0.005

  ngOnInit() {
    setTimeout(() => {
      this.setupGears()
    })

    this.defaultSpeed = this.calculateSpeed(8)
  }
  calculateSpeed(cogsPerSecond : number){
    // 58 - number of cogs, 60 - number of tries in a second
    let speedOfOneCogPerSecondInDegrees = 360 / 58 / 60

    let degreesInRadian = 180/3.141592

    let radiansOfOneCogPerSecond = speedOfOneCogPerSecondInDegrees / degreesInRadian

    return radiansOfOneCogPerSecond * cogsPerSecond
  }
  async setupGears() {
    let aspectRatio = 16/9
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

    const loader = new GLTFLoader();

    const loadedData = await loader.loadAsync(this.baseHref + 'assets/gears.glb');
    let scene = loadedData.scene
    console.debug("data", loadedData.scene)

    const renderer = new THREE.WebGLRenderer();
    this.wrapper?.nativeElement.appendChild(renderer.domElement)

    scene.rotateX(3.14 / 4)
    scene.rotateY(0.5)

    // remove background
    scene.remove(scene.children[0])

    let mediumGear = scene.children[3]
    let smallGear = scene.children[5]
    let largeGear = scene.children[4]

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1.2);
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );
    
    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( -0, 9, - 10 );
    scene.add( dirLight );

    renderer.setClearColor( THREE.Color.NAMES.skyblue, 0 );
    let i = 0;

    let mat = (mediumGear as THREE.Mesh).material as THREE.MeshStandardMaterial

    mat.color.set("#909090")

    const animate = () => {
      requestAnimationFrame(animate)

      renderer.setSize(this.size, this.size / aspectRatio);

      camera.position.z = 50;

      camera.position.set( this.x, this.y, this.z );
      i++

      if(i%60 - 30 > 0){
        mediumGear.rotateY(-this.defaultSpeed*2)
        largeGear.rotateY(this.defaultSpeed)
        smallGear.rotateY(this.defaultSpeed*4)
      }
      

      renderer.render(loadedData.scene, camera)
    }
    animate()
  }
}
