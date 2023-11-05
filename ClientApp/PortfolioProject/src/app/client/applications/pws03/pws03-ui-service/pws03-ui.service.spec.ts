import { TestBed } from '@angular/core/testing';

import { Pws03UiService } from './pws03-ui.service';

describe('Pws03UiService', () => {
  let service: Pws03UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pws03UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
