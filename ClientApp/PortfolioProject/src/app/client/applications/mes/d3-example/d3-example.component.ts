import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-d3-example',
  templateUrl: './d3-example.component.html',
  styleUrl: './d3-example.component.css'
})
export class D3ExampleComponent {
  @ViewChild("wrapper") wrapper: ElementRef<HTMLElement> | undefined

  ngOnInit() {
    setTimeout(() => {
      this.setupGears()

    })
  }

  setupGears() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.wrapper?.nativeElement.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    let i = 0
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      camera.position.z = 5;

      i++

      renderer.render(scene, camera)
    }
    animate()
  }
}
