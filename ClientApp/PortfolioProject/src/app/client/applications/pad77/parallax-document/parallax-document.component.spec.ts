import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxDocumentComponent } from './parallax-document.component';

describe('ParallaxDocumentComponent', () => {
  let component: ParallaxDocumentComponent;
  let fixture: ComponentFixture<ParallaxDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParallaxDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallaxDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
