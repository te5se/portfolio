import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfoOverlayComponent } from './equipment-info-overlay.component';

describe('EquipmentInfoOverlayComponent', () => {
  let component: EquipmentInfoOverlayComponent;
  let fixture: ComponentFixture<EquipmentInfoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInfoOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentInfoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
