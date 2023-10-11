import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowsForVideoComponent } from './shadows-for-video.component';

describe('ShadowsForVideoComponent', () => {
  let component: ShadowsForVideoComponent;
  let fixture: ComponentFixture<ShadowsForVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadowsForVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadowsForVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
