import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingTriangleComponent } from './rotating-triangle.component';

describe('RotatingTriangleComponent', () => {
  let component: RotatingTriangleComponent;
  let fixture: ComponentFixture<RotatingTriangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotatingTriangleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotatingTriangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
