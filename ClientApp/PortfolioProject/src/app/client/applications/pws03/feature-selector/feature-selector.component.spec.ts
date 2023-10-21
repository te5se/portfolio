import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSelectorComponent } from './feature-selector.component';

describe('FeatureSelectorComponent', () => {
  let component: FeatureSelectorComponent;
  let fixture: ComponentFixture<FeatureSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
