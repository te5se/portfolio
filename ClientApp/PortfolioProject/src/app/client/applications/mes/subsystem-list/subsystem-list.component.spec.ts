import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsystemListComponent } from './subsystem-list.component';

describe('SubsystemListComponent', () => {
  let component: SubsystemListComponent;
  let fixture: ComponentFixture<SubsystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsystemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubsystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
