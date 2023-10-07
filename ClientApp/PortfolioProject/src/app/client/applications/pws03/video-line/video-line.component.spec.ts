import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLineComponent } from './video-line.component';

describe('VideoLineComponent', () => {
  let component: VideoLineComponent;
  let fixture: ComponentFixture<VideoLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
