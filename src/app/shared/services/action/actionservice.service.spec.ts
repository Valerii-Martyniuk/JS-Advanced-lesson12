import { TestBed } from '@angular/core/testing';

import { ActionserviceService } from './actionservice.service';

describe('ActionserviceService', () => {
  let service: ActionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
