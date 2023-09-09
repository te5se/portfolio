import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStartingPageComponent } from './client-starting-page.component';

describe('ClientStartingPageComponent', () => {
  let component: ClientStartingPageComponent;
  let fixture: ComponentFixture<ClientStartingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientStartingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStartingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
