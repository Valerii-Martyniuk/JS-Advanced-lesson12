import { TestBed } from '@angular/core/testing';

import { ActionInfoResolver } from './action-info.resolver';

describe('ActionInfoResolver', () => {
  let resolver: ActionInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ActionInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
