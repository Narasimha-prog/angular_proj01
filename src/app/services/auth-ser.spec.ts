import { TestBed } from '@angular/core/testing';

import { AuthSer } from './auth-ser';

describe('AuthSer', () => {
  let service: AuthSer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
